import React, { useState, useEffect } from 'react';
import { WMCHeader, WMCFooter } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { eventService } from '../../services/api';
import type { AjaxResponse } from '../../types';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location?: string;
  isVirtual?: boolean;
}

const Events: React.FC = () => {
  const { state } = useAuth();
  const isAuthenticated = !!state.memberData;
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response: AjaxResponse & { events?: Event[] } = await eventService.getEvents();
        if (response.Success && response.events) {
          setEvents(response.events);
        } else {
          setError('Failed to load events from API');
          setEvents([]);
        }
      } catch {
        setError('Failed to load events');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleBookEvent = async (eventId: number) => {
    if (!isAuthenticated) {
      alert('Please login first');
      return;
    }

    try {
      const response = await eventService.bookEvent(eventId);
      if (response.Success) {
        alert('Booked successfully!');
      } else {
        alert(response.Msg || 'Booking failed');
      }
    } catch {
      alert('An error occurred during booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4782b5] mx-auto"></div>
          <p className="mt-4 text-gray-600 text-center">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white text-right">
      {/* Header */}
      <WMCHeader />

      {/* Main Content */}
      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d203b] mb-6 text-center">Events and Activities</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className={`grid ${events.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <i className="fas fa-calendar-alt text-[#4782b5] text-2xl ml-3"></i>
                  <div>
                    <h3 className="text-xl font-semibold text-[#0d203b]">{event.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {new Date(event.date).toLocaleDateString('en-US')} - {event.time}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{event.description}</p>
                
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <i className={`fas ${event.isVirtual ? 'fa-video' : 'fa-map-marker-alt'} ml-2`}></i>
                  {event.location}
                </div>
                
                <button
                  onClick={() => handleBookEvent(event.id)}
                  className="w-full bg-[#4782b5] text-white py-2 px-4 rounded-md hover:bg-[#3a6b8c] transition-colors"
                >
                  {isAuthenticated ? 'Book Now' : 'Login to Book'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WMCFooter />
    </div>
  );
};

export default Events;