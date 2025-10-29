import React from 'react';
import './TrackedEventsPage.css';
import { useTrackedEvents } from '../context/TrackedEventsContext';
import type { Event } from '../data/events'; // Import Event and EventCategory types
import EventCard from '../components/EventCard'; // Import the reusable EventCard component
import { filterAndSortEvents } from '../utils/eventUtils'; // Import the utility function

const TrackedEventsPage: React.FC = () => {
  const { trackedEvents } = useTrackedEvents(); // Only need trackedEvents here

  const sortedAndFilteredEvents = filterAndSortEvents(trackedEvents);

  return (
    <div className="tracked-events-page-container">
      <h1>Tracked Events</h1>
      {sortedAndFilteredEvents.length === 0 ? (
        <p>You haven't tracked any upcoming events yet.</p>
      ) : (
        <div className="tracked-events-grid">
          {sortedAndFilteredEvents.map((event: Event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackedEventsPage;
