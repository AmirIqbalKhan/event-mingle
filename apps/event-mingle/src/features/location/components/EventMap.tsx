import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

interface Location {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: Location;
}

interface EventMapProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  center?: [number, number];
  zoom?: number;
}

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const EventMap: React.FC<EventMapProps> = ({
  events,
  onEventClick,
  center = [51.505, -0.09],
  zoom = 13,
}) => {
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    if (mapRef.current && events.length > 0) {
      const bounds = L.latLngBounds(
        events.map((event) => [event.location.latitude, event.location.longitude])
      );
      mapRef.current.fitBounds(bounds);
    }
  }, [events]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[500px] rounded-lg overflow-hidden shadow-lg"
    >
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {events.map((event) => (
          <Marker
            key={event.id}
            position={[event.location.latitude, event.location.longitude]}
            icon={icon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-gray-500">{event.location.address}</p>
                <button
                  onClick={() => onEventClick(event)}
                  className="mt-2 text-sm text-blue-500 hover:text-blue-600"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </motion.div>
  );
}; 