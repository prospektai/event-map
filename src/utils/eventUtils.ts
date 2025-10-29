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
