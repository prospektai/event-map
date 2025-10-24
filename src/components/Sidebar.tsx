import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import type { Transition } from 'framer-motion'; // Import Transition type
import type { Event, EventCategory } from '../data/events'; // Import EventCategory
import Button from './Button'; // Import the new Button component
import SearchComponent from './SearchComponent'; // Import SearchComponent
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { useTrackedEvents } from '../context/TrackedEventsContext'; // Import useTrackedEvents

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

const sidebarContentVariants = {
  initial: { opacity: 0, filter: 'blur(5px)' },
  in: { opacity: 1, filter: 'blur(0px)' },
  out: { opacity: 0, filter: 'blur(5px)' },
};

const sidebarContentTransition: Transition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
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
  showSearchIcon, // Destructure showSearchIcon prop
}) => {
  const { toggleTrackedEvent, isEventTracked } = useTrackedEvents(); // Use the context

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-top-header"> {/* New wrapper for top buttons */}
        <AnimatePresence mode="wait">
          {selectedEvent ? ( /* Only show "All events" button when an event is selected */
            <motion.div
              key="all-events-button"
              initial="initial"
              animate="in"
              exit="out"
              variants={sidebarContentVariants}
              transition={sidebarContentTransition}
            >
              <Button variant="unfilled" onClick={() => onEventClick(null)}>
                <span>{"< All events"}</span>
              </Button>
            </motion.div>
          ) : (
            <div key="empty-div-for-spacing" /> /* Empty div to maintain flex spacing if needed, or remove if not */
          )}
        </AnimatePresence>
        <button className="sidebar-header-close-btn" onClick={closeSidebar}> {/* New class for close button */}
          &times;
        </button>
      </div>
      <AnimatePresence mode="wait">
        {selectedEvent ? (
          <motion.div
            key="event-details-view" // Key for the entire event details view
            initial="initial"
            animate="in"
            exit="out"
            variants={sidebarContentVariants}
            transition={sidebarContentTransition}
            className="sidebar-content-wrapper" // New wrapper for consistent padding and scrolling
          >
            <div className="event-details-header"> {/* Keep header for title */}
              <h2>Event Details</h2>
            </div>
            <div className="event-details-scrollable-content"> {/* New div for scrollable event content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedEvent.id} // Key for unique event animation
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={sidebarContentVariants}
                  transition={sidebarContentTransition}
                >
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
                  {selectedEvent && ( // Only show button if an event is selected
                    <button
                      className={`sidebar-track-event-button ${isEventTracked(selectedEvent.id) ? 'tracked' : ''}`}
                      onClick={() => toggleTrackedEvent(selectedEvent)}
                    >
                      <FontAwesomeIcon icon={isEventTracked(selectedEvent.id) ? faSolidHeart : faRegularHeart} />{' '}
                      {isEventTracked(selectedEvent.id) ? 'Untrack Event' : 'Track Event'}
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="event-list-view" // Key for the entire event list view
            initial="initial"
            animate="in"
            exit="out"
            variants={sidebarContentVariants}
            transition={sidebarContentTransition}
            className="sidebar-content-wrapper" // New wrapper for consistent padding and scrolling
          >
            <div className="search-component-wrapper">
              <SearchComponent
                onSearch={onSearch}
                allCategories={allCategories}
                currentSearchTerm={currentSearchTerm}
                currentSelectedCategories={currentSelectedCategories}
                currentDateFrom={currentDateFrom}
                currentDateTo={currentDateTo}
                showSearchIcon={showSearchIcon} // Pass showSearchIcon to SearchComponent
                showHeading={true} // Show heading in Sidebar
              />
            </div>
            <h3 className='heading'>Visible Events</h3>
            <div className="event-list-scrollable-content"> {/* New div for scrollable event list */}
              <ul className="event-list">
                {events.map((event) => (
                  <li key={event.id} onClick={() => onEventClick(event)}>
                    {event.title}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
