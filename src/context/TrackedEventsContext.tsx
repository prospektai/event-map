import React, { createContext, useState, useContext, useEffect, useCallback, type ReactNode } from 'react';
import type { Event } from '../data/events'; // Assuming Event type is defined here or can be imported

interface TrackedEventsContextType {
  trackedEvents: Event[];
  toggleTrackedEvent: (event: Event) => void;
  isEventTracked: (eventId: number) => boolean;
}

const TrackedEventsContext = createContext<TrackedEventsContextType | undefined>(undefined);

interface TrackedEventsProviderProps {
  children: ReactNode;
}

export const TrackedEventsProvider: React.FC<TrackedEventsProviderProps> = ({ children }) => {
  // Load tracked events from localStorage on initial render
  const [trackedEvents, setTrackedEvents] = useState<Event[]>(() => {
    try {
      const storedEvents = localStorage.getItem('trackedEvents');
      return storedEvents ? JSON.parse(storedEvents) : [];
    } catch (error) {
      console.error("Failed to load tracked events from localStorage", error);
      return [];
    }
  });

  // Save tracked events to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('trackedEvents', JSON.stringify(trackedEvents));
    } catch (error) {
      console.error("Failed to save tracked events to localStorage", error);
    }
  }, [trackedEvents]);

  const toggleTrackedEvent = useCallback((eventToToggle: Event) => {
    setTrackedEvents(prevEvents => {
      const isCurrentlyTracked = prevEvents.some(event => event.id === eventToToggle.id);
      if (isCurrentlyTracked) {
        return prevEvents.filter(event => event.id !== eventToToggle.id);
      } else {
        return [...prevEvents, eventToToggle];
      }
    });
  }, []);

  const isEventTracked = useCallback((eventId: number) => {
    return trackedEvents.some(event => event.id === eventId);
  }, [trackedEvents]);

  return (
    <TrackedEventsContext.Provider value={{ trackedEvents, toggleTrackedEvent, isEventTracked }}>
      {children}
    </TrackedEventsContext.Provider>
  );
};

export const useTrackedEvents = () => {
  const context = useContext(TrackedEventsContext);
  if (context === undefined) {
    throw new Error('useTrackedEvents must be used within a TrackedEventsProvider');
  }
  return context;
};
