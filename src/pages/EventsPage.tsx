import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import SearchComponent from '../components/SearchComponent';
import { events, type Event, type EventCategory } from '../data/events';
import { categoryIcons } from '../utils/categoryIcons';
import '../App.css';
import './EventsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Added solid heart icon
// Removed faHeart imports as they are now in EventCard
// Removed useTrackedEvents as it's now in EventCard
import EventCard from '../components/EventCard'; // Import the new EventCard component
import { filterAndSortEvents } from '../utils/eventUtils'; // Import the utility function

const EventsPage: React.FC = () => {
  const allCategories: EventCategory[] = useMemo(() => {
    const categories = new Set<EventCategory>();
    events.forEach(event => event.categories.forEach(cat => categories.add(cat)));
    return Array.from(categories).sort();
  }, []);

  // Refs for each event-cards-row
  const scrollRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [showScrollButtons, setShowScrollButtons] = useState<Map<string, boolean>>(new Map());

  const checkScrollOverflow = useCallback((category: string) => {
    const row = scrollRefs.current.get(category);
    if (row) {
      const hasOverflow = row.scrollWidth > row.clientWidth;
      setShowScrollButtons(prev => {
        const newMap = new Map(prev);
        if (newMap.get(category) !== hasOverflow) {
          newMap.set(category, hasOverflow);
          return newMap;
        }
        return prev;
      });
    }
  }, []);

  const addToRefs = useCallback((node: HTMLDivElement | null, category: string) => {
    if (node) {
      scrollRefs.current.set(category, node);
      // Immediately check overflow when a ref is added
      checkScrollOverflow(category);
    } else {
      scrollRefs.current.delete(category);
    }
  }, [checkScrollOverflow]);

  const scrollRow = useCallback((category: string, direction: 'left' | 'right') => {
    const row = scrollRefs.current.get(category);
    if (row) {
      const cardWidth = 300; // Fixed width of event-card (adjust if your CSS changes this)
      const gap = 20; // Gap between cards (adjust if your CSS changes this)
      const scrollAmount = (cardWidth * 2) + (gap * 2); // Scroll by 2 cards + 2 gaps

      if (direction === 'left') {
        row.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  const handleSearch = useCallback((
    term: string,
    categories: EventCategory[],
    from: string,
    to: string
  ) => {
    setSearchTerm(term);
    setSelectedCategories(categories);
    setDateFrom(from);
    setDateTo(to);
  }, []);

  useEffect(() => {
    const filterEvents = () => {
      // Start with all events, filtered and sorted by date
      let tempEvents = filterAndSortEvents(events);

      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        tempEvents = tempEvents.filter(event =>
          event.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          event.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }

      if (selectedCategories.length > 0) {
        tempEvents = tempEvents.filter(event =>
          event.categories.some(cat => selectedCategories.includes(cat))
        );
      }

      if (dateFrom) {
        tempEvents = tempEvents.filter(event => event.date >= dateFrom);
      }
      if (dateTo) {
        tempEvents = tempEvents.filter(event => event.date <= dateTo);
      }

      setFilteredEvents(tempEvents);
    };

    filterEvents();
  }, [searchTerm, selectedCategories, dateFrom, dateTo]);

  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: Event[] } = {};
    filteredEvents.forEach(event => {
      event.categories.forEach(category => {
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(event);
      });
    });
    return groups;
  }, [filteredEvents]);

  useEffect(() => {
    const handleResize = () => {
      scrollRefs.current.forEach((_, category) => {
        checkScrollOverflow(category);
      });
    };

    window.addEventListener('resize', handleResize);
    // Initial check for all categories after component mounts and refs are set
    scrollRefs.current.forEach((_, category) => {
      checkScrollOverflow(category);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [checkScrollOverflow, groupedEvents]); // Re-run if groupedEvents changes

  return (
    <div className="events-page-container">
      <div className="events-search-section">
        <div className="events-search-bar-wrapper">
          <SearchComponent
            onSearch={handleSearch}
            allCategories={allCategories}
            currentSearchTerm={searchTerm}
            currentSelectedCategories={selectedCategories}
            currentDateFrom={dateFrom}
            currentDateTo={dateTo}
            showSearchIcon={true}
            showHeading={false}
            isEventsPage={true} // New prop to indicate it's on the Events Page
          />
        </div>
      </div>

      <div className="events-content">
        {Object.keys(groupedEvents).length === 0 ? (
          <p className="no-events-message">No events found matching your criteria.</p>
        ) : (
          Object.entries(groupedEvents).map(([category, eventsInCategory]) => (
            <div key={category} className="event-category-section">
              <div className="event-category-header">
                <h2 className="event-category-title">{categoryIcons[category as EventCategory]} {category}</h2>
                <div className="event-category-navigation">
                  {showScrollButtons.get(category) && (
                    <>
                      <button className="nav-arrow-button left" onClick={() => scrollRow(category, 'left')}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                      <button className="nav-arrow-button right" onClick={() => scrollRow(category, 'right')}>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div
                className="event-cards-row"
                ref={node => addToRefs(node, category)}
              >
                {eventsInCategory.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsPage;
