'use client';

import { motion } from 'framer-motion';

interface AnalyticsData {
  totalAttendees: number;
  confirmedAttendees: number;
  pendingAttendees: number;
  cancelledAttendees: number;
  ticketSales: {
    total: number;
    byType: Record<string, number>;
  };
  registrationTrend: {
    date: string;
    count: number;
  }[];
  demographics: {
    ageGroups: Record<string, number>;
    gender: Record<string, number>;
    location: Record<string, number>;
  };
}

interface EventAnalyticsProps {
  data: AnalyticsData;
}

export default function EventAnalytics({ data }: EventAnalyticsProps) {
  const {
    totalAttendees,
    confirmedAttendees,
    pendingAttendees,
    cancelledAttendees,
    ticketSales,
    registrationTrend,
    demographics
  } = data;

  const getPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Analytics</h2>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 p-4 rounded-lg"
          >
            <h3 className="text-sm font-medium text-blue-800">Total Attendees</h3>
            <p className="text-2xl font-bold text-blue-900">{totalAttendees}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-green-50 p-4 rounded-lg"
          >
            <h3 className="text-sm font-medium text-green-800">Confirmed</h3>
            <p className="text-2xl font-bold text-green-900">{confirmedAttendees}</p>
            <p className="text-sm text-green-700">
              {getPercentage(confirmedAttendees, totalAttendees)}% of total
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-yellow-50 p-4 rounded-lg"
          >
            <h3 className="text-sm font-medium text-yellow-800">Pending</h3>
            <p className="text-2xl font-bold text-yellow-900">{pendingAttendees}</p>
            <p className="text-sm text-yellow-700">
              {getPercentage(pendingAttendees, totalAttendees)}% of total
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-red-50 p-4 rounded-lg"
          >
            <h3 className="text-sm font-medium text-red-800">Cancelled</h3>
            <p className="text-2xl font-bold text-red-900">{cancelledAttendees}</p>
            <p className="text-sm text-red-700">
              {getPercentage(cancelledAttendees, totalAttendees)}% of total
            </p>
          </motion.div>
        </div>

        {/* Ticket Sales */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Sales</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total Revenue</span>
              <span className="text-xl font-bold text-gray-900">${ticketSales.total}</span>
            </div>
            <div className="space-y-2">
              {Object.entries(ticketSales.byType).map(([type, amount]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-gray-600">{type}</span>
                  <span className="font-medium text-gray-900">${amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Demographics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Age Groups */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Groups</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              {Object.entries(demographics.ageGroups).map(([group, count]) => (
                <div key={group} className="flex justify-between items-center">
                  <span className="text-gray-600">{group}</span>
                  <span className="font-medium text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              {Object.entries(demographics.gender).map(([gender, count]) => (
                <div key={gender} className="flex justify-between items-center">
                  <span className="text-gray-600">{gender}</span>
                  <span className="font-medium text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Locations</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              {Object.entries(demographics.location)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([location, count]) => (
                  <div key={location} className="flex justify-between items-center">
                    <span className="text-gray-600">{location}</span>
                    <span className="font-medium text-gray-900">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 