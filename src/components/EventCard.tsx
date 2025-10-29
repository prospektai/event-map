import React from 'react';
import type { Event, EventCategory } from '../data/events';
import { categoryIcons } from '../utils/categoryIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { useTrackedEvents } from '../context/TrackedEventsContext';
import { addToCalendar } from '../utils/eventUtils'; // Import addToCalendar
import './EventCard.css'; // Import component-specific CSS

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { toggleTrackedEvent, isEventTracked } = useTrackedEvents();

  return (
    <div key={event.id} className="event-card">
      {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="event-card-image" />}
      <button
        className={`track-event-button ${isEventTracked(event.id) ? 'tracked' : ''}`}
        onClick={() => toggleTrackedEvent(event)}
      >
        <FontAwesomeIcon icon={isEventTracked(event.id) ? faSolidHeart : faRegularHeart} />
      </button>
      <button
        className="add-to-calendar-button"
        onClick={() => addToCalendar(event)}
      >
        <FontAwesomeIcon icon={faCalendarPlus} />
      </button>
      <h3 className="event-card-title">{event.title}</h3>
      <p className="event-card-date">{event.date} at {event.time}</p>
      <p className="event-card-description">{event.description}</p>
      <div className="event-card-categories">
        {event.categories.map(cat => (
          <span key={cat} className="event-card-category-tag">
            {categoryIcons[cat as EventCategory]} {cat}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
