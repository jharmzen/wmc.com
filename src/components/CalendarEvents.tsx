import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { Event } from '../types';

export function CalendarEvents() {
  const { state } = useAuth();
  const memberStatusCode = state.memberData?.MemberStatusCode || '';
  const memberEvents: Event[] = state.events || [];

  // Allowed member status codes for booking
  const allowedCodes = ['MS-D', 'MS-EXEC', 'MS-PREM', 'MS-PE', 'MS-P', 'MS-PG', 'MS-PS'];

  // Transform member events to the format needed for display
  const upcomingEvents =
    memberEvents.length > 0
      ? memberEvents.map((event, index) => ({
          id: index + 1,
          title: event.SeminarName,
          date: formatDate(event.EventDate),
          time: formatTime(event.StartTime),
          location: formatVenue(event.Venue),
          image: event.SocialImage,
          rawDate: event.EventDate,
          rawStartTime: event.StartTime,
        }))
      : [];

  // Helper functions for formatting event data
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function formatTime(timeString: string): string {
    const timeParts = timeString.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1];
    const endHours = (hours + 2) % 24; // Assuming 2-hour duration
    return `${hours}:${minutes} - ${endHours}:${minutes}`;
  }

  function formatVenue(venue: string): string {
    return venue.replace(/<\/?[^>]+(>|$)/g, '');
  }

  // Format date and time for ICS (YYYYMMDDTHHMMSSZ)
  function formatICSDateTime(dateString: string, timeString: string): string {
    const date = new Date(dateString);
    const [hours, minutes] = timeString.split(':');
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  // Helper to add hours to a time string for ICS end time
  function addHours(timeString: string, hoursToAdd: number): string {
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalHours = (hours + hoursToAdd) % 24;
    return `${totalHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  // Generate and download ICS file
  const handleAddToCalendar = () => {
    if (upcomingEvents.length === 0) {
      alert('No upcoming events to add to your calendar.');
      return;
    }

    const icsEvents = upcomingEvents.map((event) => {
      const startTime = formatICSDateTime(event.rawDate, event.rawStartTime);
      const endTime = formatICSDateTime(event.rawDate, addHours(event.rawStartTime, 2));
      return [
        'BEGIN:VEVENT',
        `DTSTART:${startTime}`,
        `DTEND:${endTime}`,
        `SUMMARY:${event.title}`,
        `LOCATION:${event.location}`,
        `DESCRIPTION:Join us for ${event.title} at ${event.location}`,
        'END:VEVENT',
      ].join('\r\n');
    });

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//WMC//CalendarEvents//EN',
      ...icsEvents,
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'upcoming_events.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleBookNowNonMember = () => {
    window.open('https://wealthmastersclub.com/seminars/', '_blank');
  };

  const handleBookNow = (date: string, location: string) => {
    const email = 'services@wealthmastersclub.com';
    const subject = `Event Booking: ${date} at ${location}`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoLink, '_blank');
  };

  const getBookingHandler = (date: string, location: string) => {
    if (!allowedCodes.includes(memberStatusCode)) {
      return () => handleBookNowNonMember();
    }
    return () => handleBookNow(date, location);
  };

  // If no events, show postponement notice
  if (upcomingEvents.length === 0) {
    return (
      <div className="p-6 mt-16">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Events</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="border rounded-lg overflow-hidden">
            <img
              src="https://backoffice.treoc.com/data/archive/documents/images/68edc640c7b67.png"
              alt="Postponed Event"
              className="w-full object-contain"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">EVENTS POSTPONED TO NEXT YEAR!</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <p>We're making big upgrades to deliver an even better Wealth Masters Experience in 2026.</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <p>Our team is working behind the scenes to bring you new events, enhanced content, and powerful opportunities to build lasting wealth.</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <p>👉 Stay connected for updates on the new event dates and exciting announcements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 mt-16">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
          <button
            onClick={handleAddToCalendar}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add to Calendar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <button
                  onClick={getBookingHandler(event.date, event.location)}
                  className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">My Calendar</h2>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 31 }, (_, i) => {
            const eventDays = memberEvents.map((e) =>
              new Date(e.EventDate).getDate()
            );
            const isEventDay = eventDays.includes(i + 1);

            return (
              <div
                key={i}
                className={`aspect-square border rounded-lg p-2 text-center ${
                  isEventDay ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <span className="text-sm">{i + 1}</span>
                {isEventDay && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
