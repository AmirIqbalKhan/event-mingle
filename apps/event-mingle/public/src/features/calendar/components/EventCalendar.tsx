import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
}

interface EventCalendarProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  onDateClick: (date: Date) => void;
}

export const EventCalendar: React.FC<EventCalendarProps> = ({
  events,
  onEventClick,
  onDateClick,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isExporting, setIsExporting] = useState(false);

  const tileContent = ({ date }: { date: Date }) => {
    const dayEvents = events.filter(
      (event) => format(new Date(event.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    return dayEvents.length > 0 ? (
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
      </div>
    ) : null;
  };

  const handleExportToGoogle = async () => {
    setIsExporting(true);
    try {
      const response = await axios.post('/api/calendar/export', {
        events: events.map((event) => ({
          summary: event.title,
          description: event.description,
          start: {
            dateTime: `${event.date}T${event.startTime}`,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          end: {
            dateTime: `${event.date}T${event.endTime}`,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          location: event.location.address,
        })),
      });

      window.open(response.data.url, '_blank');
      toast.success('Events exported to Google Calendar');
    } catch (error) {
      toast.error('Failed to export events');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportICS = async () => {
    setIsExporting(true);
    try {
      const response = await axios.post('/api/calendar/ics', {
        events: events.map((event) => ({
          title: event.title,
          description: event.description,
          start: `${event.date}T${event.startTime}`,
          end: `${event.date}T${event.endTime}`,
          location: event.location.address,
        })),
      });

      const blob = new Blob([response.data], { type: 'text/calendar' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'events.ics');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Events exported as ICS file');
    } catch (error) {
      toast.error('Failed to export events');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Event Calendar</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleExportToGoogle}
            disabled={isExporting}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Export to Google
          </button>
          <button
            onClick={handleExportICS}
            disabled={isExporting}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Export ICS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Calendar
            onChange={(date) => {
              setSelectedDate(date as Date);
              onDateClick(date as Date);
            }}
            value={selectedDate}
            tileContent={tileContent}
            className="border rounded-lg"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">
            Events for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          {events
            .filter(
              (event) =>
                format(new Date(event.date), 'yyyy-MM-dd') ===
                format(selectedDate, 'yyyy-MM-dd')
            )
            .map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => onEventClick(event)}
              >
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-500">
                  {format(new Date(`${event.date}T${event.startTime}`), 'h:mm a')} -{' '}
                  {format(new Date(`${event.date}T${event.endTime}`), 'h:mm a')}
                </p>
                <p className="text-sm text-gray-500 mt-1">{event.location.address}</p>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}; 