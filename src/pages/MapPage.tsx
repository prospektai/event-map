import { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Sidebar from '../components/Sidebar';
import FloatingMenuButton from '../components/FloatingMenuButton';
import { events } from '../data/events';
import type { Event, EventCategory } from '../data/events'; // Import EventCategory
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import { getMarkerIcon } from '../utils/categoryIcons'; // Import getMarkerIcon and categoryIcons
import { useTrackedEvents } from '../context/TrackedEventsContext'; // Import useTrackedEvents
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'; // Import solid heart icon
import { renderToString } from 'react-dom/server'; // To render React component to string for DivIcon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
// Extend the L.MarkerClusterGroup type to include the spiderfy method
declare module 'leaflet' {
  interface MarkerClusterGroup {
    spiderfy: () => void;
    getVisibleParent: (marker: L.Marker) => L.MarkerCluster | null;
  }
  interface MarkerCluster {
    spiderfy: () => void;
  }
}

const MapEvents = ({ onBoundsChange }: { onBoundsChange: (bounds: L.LatLngBounds) => void }) => {
  const map = useMap();
  useEffect(() => {
    const handleMove = () => onBoundsChange(map.getBounds());
    map.on('moveend', handleMove);
    return () => {
      map.off('moveend', handleMove);
    };
  }, [map, onBoundsChange]);
  return null;
};

// New component to handle map updates based on filtered events
const MapUpdater = ({ filteredEvents, handleBoundsChange }: { filteredEvents: Event[], handleBoundsChange: (bounds: L.LatLngBounds) => void }) => {
  const map = useMap();
  useEffect(() => {
    // When filteredEvents change, re-evaluate visible events based on current map bounds
    handleBoundsChange(map.getBounds());
  }, [filteredEvents, map, handleBoundsChange]);
  return null;
};

// New component to handle map resizing when sidebar state changes
const MapResizer = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
  const map = useMap();
  useEffect(() => {
    // Invalidate map size when sidebar opens or closes to prevent horizontal scrollbar
    map.invalidateSize();
  }, [sidebarOpen, map]);
  return null;
};

const allCategories: EventCategory[] = [
  'Technology',
  'Art',
  'Music',
  'Sports',
  'Food',
  'Education',
  'Community',
  'Health',
  'Business',
  'Science',
];

const MapPage = () => {
  const { isEventTracked } = useTrackedEvents(); // Use tracked events context
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>('');
  const [currentSelectedCategories, setCurrentSelectedCategories] = useState<EventCategory[]>([]);
  const [currentDateFrom, setCurrentDateFrom] = useState<string>('');
  const [currentDateTo, setCurrentDateTo] = useState<string>('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [visibleEvents, setVisibleEvents] = useState<Event[]>(filteredEvents);
  const markerRefs = useRef<{ [key: number]: L.Marker }>({});
  const clusterGroupRef = useRef<L.MarkerClusterGroup>(null);

  // Function to create custom DivIcon for markers
  const createCustomMarkerIcon = useCallback((category: EventCategory, isSelected: boolean, isTracked: boolean) => {
    const defaultIcon = getMarkerIcon(category, isSelected); // Get the base icon
    const iconHtml = `
      <div class="custom-marker-icon-container">
        ${defaultIcon.options.html}
        ${isTracked ? `
          <div class="tracked-marker-bubble">
            ${renderToString(<FontAwesomeIcon icon={faSolidHeart} />)}
          </div>
        ` : ''}
      </div>
    `;

    return L.divIcon({
      className: 'custom-div-icon',
      html: iconHtml,
      iconSize: defaultIcon.options.iconSize,
      iconAnchor: defaultIcon.options.iconAnchor,
      popupAnchor: defaultIcon.options.popupAnchor,
    });
  }, [getMarkerIcon, faSolidHeart, renderToString, FontAwesomeIcon]); // Dependencies for useCallback

  const handleMarkerClick = (event: Event | null) => {
    setSelectedEvent(event);
    setSidebarOpen(true); // Always open sidebar when an event is clicked

    if (event && clusterGroupRef.current) {
      const marker = markerRefs.current[event.id];
      if (marker) {
        const parentCluster = clusterGroupRef.current.getVisibleParent(marker);
        if (parentCluster && 'spiderfy' in parentCluster && typeof parentCluster.spiderfy === 'function') {
          (parentCluster as L.MarkerCluster).spiderfy();
        } else {
          // If not clustered, ensure the marker is visible (e.g., pan to it)
          // map.panTo(marker.getLatLng()); // User explicitly said "don't move the map"
        }
      }
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    // Do not clear selectedEvent, so it persists when sidebar is reopened
  };

  const handleSearch = useCallback((searchTerm: string, categories: EventCategory[], dateFrom: string, dateTo: string) => {
    setCurrentSearchTerm(searchTerm);
    setCurrentSelectedCategories(categories);
    setCurrentDateFrom(dateFrom);
    setCurrentDateTo(dateTo);

    let newFilteredEvents = events;

    if (searchTerm) {
      newFilteredEvents = newFilteredEvents.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categories.length > 0) {
      newFilteredEvents = newFilteredEvents.filter((event) =>
        event.categories.some(cat => categories.includes(cat))
      );
    }

    if (dateFrom) {
      newFilteredEvents = newFilteredEvents.filter((event) => event.date >= dateFrom);
    }
    if (dateTo) {
      newFilteredEvents = newFilteredEvents.filter((event) => event.date <= dateTo);
    }

    setFilteredEvents(newFilteredEvents);
  }, []); // No dependencies, as `events` is a constant

  const handleBoundsChange = useCallback((bounds: L.LatLngBounds) => {
    const visible = filteredEvents.filter((event) =>
      bounds.contains(event.position)
    );
    setVisibleEvents(visible);
  }, [filteredEvents]);

  useEffect(() => {
    // Trigger initial filtering and visibility update on mount
    handleSearch(currentSearchTerm, currentSelectedCategories, currentDateFrom, currentDateTo);
  }, [currentSearchTerm, currentSelectedCategories, currentDateFrom, currentDateTo, handleSearch]);

  return (
    <div className="map-page">
      <MapContainer center={[54.6872, 25.2797]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup ref={clusterGroupRef}>
          {visibleEvents.map((event) => (
            <Marker
              key={event.id}
              position={event.position}
              eventHandlers={{ click: () => handleMarkerClick(event) }}
              icon={createCustomMarkerIcon(event.categories[0], selectedEvent?.id === event.id, isEventTracked(event.id))}
              ref={(marker) => {
                if (marker) {
                  markerRefs.current[event.id] = marker;
                } else {
                  delete markerRefs.current[event.id];
                }
              }}
            />
          ))}
        </MarkerClusterGroup>
        <MapEvents onBoundsChange={handleBoundsChange} />
        <MapUpdater filteredEvents={filteredEvents} handleBoundsChange={handleBoundsChange} />
        <MapResizer sidebarOpen={sidebarOpen} />
      </MapContainer>
      <Sidebar
        events={visibleEvents}
        selectedEvent={selectedEvent}
        onEventClick={handleMarkerClick}
        closeSidebar={closeSidebar}
        isOpen={sidebarOpen}
        onSearch={handleSearch}
        allCategories={allCategories}
        currentSearchTerm={currentSearchTerm}
        currentSelectedCategories={currentSelectedCategories}
        currentDateFrom={currentDateFrom}
        currentDateTo={currentDateTo}
        showSearchIcon={true} // Add search icon to MapPage's SearchComponent
      />
      <FloatingMenuButton isOpen={sidebarOpen} onClick={() => setSidebarOpen(true)} />
    </div>
  );
};

export default MapPage;
