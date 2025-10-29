import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Keep AnimatePresence for internal content
import type { Variants } from 'framer-motion'; // Import Variants as a type
import type { Event, EventCategory } from '../data/events'; // Import EventCategory
import Button from './Button'; // Import the new Button component
import SearchComponent from './SearchComponent'; // Import SearchComponent
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { useTrackedEvents } from '../context/TrackedEventsContext'; // Import useTrackedEvents
import { addToCalendar } from '../utils/eventUtils'; // Import addToCalendar

interface SidebarProps {
  events: Event[];
  selectedEvent: Event | null;
  onEventClick: (event: Event | null) => void;
  closeSidebar: () => void;
  isOpen: boolean;
  onSearch: (searchTerm: string, categories: EventCategory[], dateFrom: string, dateTo: string) => void;
  allCategories: EventCategory[];
  currentSearchTerm: string;
  currentSelectedCategories: EventCategory[];
  currentDateFrom: string;
  currentDateTo: string;
  showSearchIcon?: boolean; // Add showSearchIcon prop to SidebarProps
}

const sidebarVariants: Variants = {
  open: { x: '0%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
};

const Sidebar: React.FC<SidebarProps> = ({
  events,
  selectedEvent,
  onEventClick,
  closeSidebar,
  isOpen,
  onSearch,
  allCategories,
  currentSearchTerm,
  currentSelectedCategories,
  currentDateFrom,
  currentDateTo,
  showSearchIcon,
}) => {
  const { toggleTrackedEvent, isEventTracked } = useTrackedEvents();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="sidebar"
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
        >
          <div className="sidebar-content-wrapper">
            <div className="sidebar-top-header">
              <AnimatePresence mode="wait">
                {selectedEvent ? (
                  <div key="all-events-button">
                    <Button variant="unfilled" onClick={() => onEventClick(null)}>
                      <span>{"< All events"}</span>
                    </Button>
                  </div>
                ) : (
                  <div key="empty-div-for-spacing" />
                )}
              </AnimatePresence>
              <button className="sidebar-header-close-btn" onClick={closeSidebar}>
                &times;
              </button>
            </div>
            <AnimatePresence mode="wait">
              {selectedEvent ? (
                <div
                  key="event-details-view"
                  className="sidebar-scrollable-area"
                >
                  <div className="event-details-header">
                    <h2>Event Details</h2>
                  </div>
                  <div className="event-details-scrollable-content">
                    <AnimatePresence mode="wait">
                      <div key={selectedEvent.id}>
                        {selectedEvent.imageUrl && (
                          <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="event-image" />
                        )}
                        <h3>{selectedEvent.title}</h3>
                        <p>
                          <strong>Categories:</strong> {selectedEvent.categories.join(', ')}
                        </p>
                        <p>{selectedEvent.description}</p>
                        <p>
                          <strong>Date:</strong> {selectedEvent.date}
                        </p>
                        <p>
                          <strong>Time:</strong> {selectedEvent.time}
                        </p>
                        {selectedEvent && (
                          <button
                            className={`sidebar-track-event-button ${isEventTracked(selectedEvent.id) ? 'tracked' : ''}`}
                            onClick={() => toggleTrackedEvent(selectedEvent)}
                          >
                            <FontAwesomeIcon icon={isEventTracked(selectedEvent.id) ? faSolidHeart : faRegularHeart} />{' '}
                            {isEventTracked(selectedEvent.id) ? 'Untrack Event' : 'Track Event'}
                          </button>
                        )}
                        {selectedEvent && (
                          <button
                            className="sidebar-add-to-calendar-button"
                            onClick={() => addToCalendar(selectedEvent)}
                          >
                            <FontAwesomeIcon icon={faCalendarPlus} />{' '}
                            Add to Calendar
                          </button>
                        )}
                      </div>
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div
                  key="event-list-view"
                  className="sidebar-scrollable-area"
                >
                  <div className="search-component-wrapper">
                    <SearchComponent
                      onSearch={onSearch}
                      allCategories={allCategories}
                      currentSearchTerm={currentSearchTerm}
                      currentSelectedCategories={currentSelectedCategories}
                      currentDateFrom={currentDateFrom}
                      currentDateTo={currentDateTo}
                      showSearchIcon={showSearchIcon}
                      showHeading={true}
                    />
                  </div>
                  <h3 className='heading'>Visible Events</h3>
                  <div className="event-list-scrollable-content">
                    <ul className="event-list">
                      {events.map((event) => (
                        <li key={event.id} onClick={() => onEventClick(event)}>
                          {event.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
