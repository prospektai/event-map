import React, { useState, useEffect, useCallback } from 'react';
import type { EventCategory } from '../data/events';
import './SearchComponent.css';
import Button from './Button'; // Assuming Button component is available
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'; // Import faSearch, faFilter, and faCalendarAlt
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import datepicker CSS

// Helper function to format Date object to YYYY-MM-DD string in local timezone
const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface SearchComponentProps {
  onSearch: (searchTerm: string, categories: EventCategory[], dateFrom: string, dateTo: string) => void;
  allCategories: EventCategory[];
  currentSearchTerm: string;
  currentSelectedCategories: EventCategory[];
  currentDateFrom: string;
  currentDateTo: string;
  showSearchIcon?: boolean; // New prop for showing search icon
  showHeading?: boolean; // New prop for showing the heading
  isEventsPage?: boolean; // New prop to indicate if it's on the Events Page
}

// Custom input component for DatePicker with an icon
const DateInputWithIcon = React.forwardRef<HTMLInputElement, { value?: string; onClick?: () => void; placeholder?: string }>(
  ({ value, onClick, placeholder }, ref) => (
    <div className="custom-date-input-container" onClick={onClick}>
      <FontAwesomeIcon icon={faCalendarAlt} className="date-input-icon" />
      <input
        type="text"
        className="date-input"
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        readOnly
        ref={ref}
      />
    </div>
  )
);

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  allCategories,
  currentSearchTerm,
  currentSelectedCategories,
  currentDateFrom,
  currentDateTo,
  showSearchIcon, // Destructure new prop
  showHeading = true, // Destructure new prop with default true
  isEventsPage, // Destructure new prop
}) => {
  const [searchTerm, setSearchTerm] = useState(currentSearchTerm);
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>(currentSelectedCategories);
  const [dateFrom, setDateFrom] = useState<Date | null>(currentDateFrom ? new Date(currentDateFrom) : null); // Initialize directly from string
  const [dateTo, setDateTo] = useState<Date | null>(currentDateTo ? new Date(currentDateTo) : null); // Initialize directly from string
  const [showFilters, setShowFilters] = useState(false); // Collapsed by default

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of today for comparison

  const debouncedSearch = useCallback(
    (term: string, categories: EventCategory[], from: Date | null, to: Date | null) => {
      const handler = setTimeout(() => {
        onSearch(
          term,
          categories,
          from ? formatDateToYYYYMMDD(from) : '', // Use helper function for local date string
          to ? formatDateToYYYYMMDD(to) : ''    // Use helper function for local date string
        );
      }, 250); // Reduced debounce to 250ms
      return () => clearTimeout(handler);
    },
    [onSearch]
  );

  useEffect(() => {
    const cleanup = debouncedSearch(searchTerm, selectedCategories, dateFrom, dateTo);
    return cleanup;
  }, [searchTerm, selectedCategories, dateFrom, dateTo, debouncedSearch]);

  const handleCategoryChange = (category: EventCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleDateFromChange = (date: Date | null) => {
    if (date && date < today) {
      alert("Start date cannot be in the past.");
      return;
    }
    if (dateTo && date && date > dateTo) {
      alert("Start date cannot be after end date.");
      return;
    }
    setDateFrom(date);
  };

  const handleDateToChange = (date: Date | null) => {
    if (date && date < today) {
      alert("End date cannot be in the past.");
      return;
    }
    if (dateFrom && date && date < dateFrom) {
      alert("End date cannot be before start date.");
      return;
    }
    setDateTo(date);
  };

  const clearSearchTerm = () => setSearchTerm('');
  const clearCategories = () => setSelectedCategories([]);
  const clearDateFrom = () => setDateFrom(null);
  const clearDateTo = () => setDateTo(null);

  const clearAllFilters = () => {
    onSearch('', [], '', ''); // Call onSearch with empty values to clear filters in parent
  };

  useEffect(() => {
    setSearchTerm(currentSearchTerm);
  }, [currentSearchTerm]);

  useEffect(() => {
    setSelectedCategories(currentSelectedCategories);
  }, [currentSelectedCategories]);

  useEffect(() => {
    setDateFrom(currentDateFrom ? new Date(currentDateFrom) : null); // Initialize directly from string
  }, [currentDateFrom]);

  useEffect(() => {
    setDateTo(currentDateTo ? new Date(currentDateTo) : null); // Initialize directly from string
  }, [currentDateTo]);

  return (
    <div className={`search-component ${isEventsPage ? 'events-page-search' : ''}`}>
      {showHeading && <h2 className="search-heading">Search for events</h2>}
      <div className="search-input-container">
        {showSearchIcon && ( // Conditionally render search icon
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        )}
        <input
          type="text"
          placeholder="yoga / music / conference ..." // Updated hint
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button className="clear-input-button" onClick={clearSearchTerm}>
            &times;
          </button>
        )}
        <button className="filter-toggle-button" onClick={() => setShowFilters(!showFilters)}>
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
        </button>
      </div>

      {(currentSearchTerm || currentSelectedCategories.length > 0 || currentDateFrom || currentDateTo) && (
        <Button variant="unfilled" onClick={clearAllFilters} className="clear-all-button">
          Clear All Filters
        </Button>
      )}

      <AnimatePresence>
        {showFilters && (
          <motion.div
            key="filters"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={{
              collapsed: { height: 0, opacity: 0, overflow: 'hidden' },
              expanded: isEventsPage
                ? { height: 350, opacity: 1, overflow: 'visible' } // Changed to visible for Events Page to prevent datepicker cutoff
                : { height: 'auto', opacity: 1, overflow: 'visible' }, // Auto height for Sidebar (normal flow)
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="filters-container"
          >
            <div className="filter-group">
              <h3>Categories</h3>
              {selectedCategories.length > 0 && (
                <button className="clear-filter-button" onClick={clearCategories}>
                  &times;
                </button>
              )}
            </div>
            <div className="category-checkboxes">
              {allCategories.map((category) => (
                <label key={category}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>

            <div className="date-inputs-container">
              <div className="date-input-group">
                <div className="filter-group">
                  <h3>Date From</h3>
                  {dateFrom && (
                    <button className="clear-filter-button" onClick={clearDateFrom}>
                      &times;
                    </button>
                  )}
                </div>
                <DatePicker
                  selected={dateFrom}
                  onChange={handleDateFromChange}
                  className="date-input"
                  minDate={today}
                  placeholderText="Start date" // Changed tooltip text
                  dateFormat="yyyy-MM-dd"
                  customInput={<DateInputWithIcon />} // Use custom input with icon
                  popperPlacement="bottom-start" // Ensure consistent placement
                  // Removed withPortal and portalId
                />
              </div>

              <div className="date-input-group">
                <div className="filter-group">
                  <h3>Date To</h3>
                  {dateTo && (
                    <button className="clear-filter-button" onClick={clearDateTo}>
                      &times;
                    </button>
                  )}
                </div>
                <DatePicker
                  selected={dateTo}
                  onChange={handleDateToChange}
                  className="date-input"
                  minDate={dateFrom || today}
                  placeholderText="End date" // Changed tooltip text
                  dateFormat="yyyy-MM-dd"
                  customInput={<DateInputWithIcon />} // Use custom input with icon
                  popperPlacement="bottom-end" // Ensure consistent placement
                  // Removed withPortal and portalId
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchComponent;
