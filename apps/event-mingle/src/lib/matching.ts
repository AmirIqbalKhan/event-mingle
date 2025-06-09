import { prisma } from './db';
import { Event, User } from '@prisma/client';

interface UserPreferences {
  interests: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  priceRange: {
    min: number;
    max: number;
  };
  preferredCategories: string[];
}

export async function calculateEventScore(
  event: Event,
  user: User,
  preferences: UserPreferences
): Promise<number> {
  let score = 0;

  // Location-based scoring (0-30 points)
  const distance = calculateDistance(
    preferences.location.latitude,
    preferences.location.longitude,
    event.latitude,
    event.longitude
  );
  score += Math.max(0, 30 - distance * 2); // 30 points for very close, decreasing with distance

  // Price range scoring (0-20 points)
  if (event.price >= preferences.priceRange.min && event.price <= preferences.priceRange.max) {
    score += 20;
  } else {
    const priceDiff = Math.min(
      Math.abs(event.price - preferences.priceRange.min),
      Math.abs(event.price - preferences.priceRange.max)
    );
    score += Math.max(0, 20 - priceDiff);
  }

  // Category matching (0-25 points)
  if (preferences.preferredCategories.includes(event.category)) {
    score += 25;
  }

  // Time-based scoring (0-25 points)
  const timeUntilEvent = new Date(event.startDate).getTime() - new Date().getTime();
  const daysUntilEvent = timeUntilEvent / (1000 * 60 * 60 * 24);
  if (daysUntilEvent >= 0 && daysUntilEvent <= 7) {
    score += 25; // Events happening within a week
  } else if (daysUntilEvent > 7 && daysUntilEvent <= 14) {
    score += 15; // Events happening within two weeks
  } else if (daysUntilEvent > 14 && daysUntilEvent <= 30) {
    score += 10; // Events happening within a month
  }

  return score;
}

export async function getRecommendedEvents(userId: string): Promise<Event[]> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      preferences: true,
      eventHistory: true,
    },
  });

  if (!user || !user.preferences) {
    return [];
  }

  const preferences: UserPreferences = {
    interests: user.preferences.interests,
    location: {
      latitude: user.preferences.latitude,
      longitude: user.preferences.longitude,
    },
    priceRange: {
      min: user.preferences.minPrice,
      max: user.preferences.maxPrice,
    },
    preferredCategories: user.preferences.categories,
  };

  // Get all published events
  const events = await prisma.event.findMany({
    where: {
      status: 'published',
      startDate: {
        gte: new Date(),
      },
    },
  });

  // Calculate scores for each event
  const scoredEvents = await Promise.all(
    events.map(async (event) => ({
      event,
      score: await calculateEventScore(event, user, preferences),
    }))
  );

  // Sort events by score and return top recommendations
  return scoredEvents
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(({ event }) => event);
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
} 