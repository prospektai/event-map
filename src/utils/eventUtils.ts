import type { Event } from '../data/events';

export const filterAndSortEvents = (events: Event[]): Event[] => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normalize to start of today for comparison

  return events
    .filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0); // Normalize event date
      return eventDate >= now; // Keep events that are today or in the future
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime(); // Sort by date, nearest first
    });
};

export const addToCalendar = (event: Event) => {
  const startDate = new Date(`${event.date}T${event.time}`);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Assume 1 hour duration for simplicity

  const formatDateTime = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d{3}/g, '');
  };

  const location = event.location ? `&location=${encodeURIComponent(event.location)}` : '';
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDateTime(startDate)}/${formatDateTime(endDate)}&details=${encodeURIComponent(event.description)}${location}&sf=true&output=xml`;

  window.open(googleCalendarUrl, '_blank');
};
