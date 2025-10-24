import React from 'react';
import './TrackedEventsPage.css';
import { useTrackedEvents } from '../context/TrackedEventsContext';
import type { Event, EventCategory } from '../data/events'; // Import Event and EventCategory types
import { categoryIcons } from '../utils/categoryIcons'; // Import categoryIcons
import EventCard from '../components/EventCard'; // Import the reusable EventCard component

const TrackedEventsPage: React.FC = () => {
  const { trackedEvents } = useTrackedEvents(); // Only need trackedEvents here

  return (
    <div className="tracked-events-page-container">
      <h1>Tracked Events</h1>
      {trackedEvents.length === 0 ? (
        <p>You haven't tracked any events yet.</p>
      ) : (
        <div className="tracked-events-grid">
          {trackedEvents.map((event: Event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackedEventsPage;
