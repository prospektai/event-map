import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import type { Transition } from 'framer-motion'; // Import Transition type
import type { Event, EventCategory } from '../data/events'; // Import EventCategory
import Button from './Button'; // Import the new Button component
import SearchComponent from './SearchComponent'; // Import SearchComponent

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
}) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="sidebar-close-btn" onClick={closeSidebar}>
        &times;
      </button>
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
            <Button variant="unfilled" onClick={() => onEventClick(null)} style={{ marginBottom: '1rem' }}>
              &lt; All events
            </Button>
            <h2>Event Details</h2>
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
