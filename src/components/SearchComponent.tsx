import React, { useState, useEffect, useCallback } from 'react';
import type { EventCategory } from '../data/events';
import './SearchComponent.css';
import Button from './Button'; // Assuming Button component is available
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchComponentProps {
  onSearch: (searchTerm: string, categories: EventCategory[], dateFrom: string, dateTo: string) => void;
  allCategories: EventCategory[];
  currentSearchTerm: string;
  currentSelectedCategories: EventCategory[];
  currentDateFrom: string;
  currentDateTo: string;
}

const filterVariants = {
  collapsed: { height: 0, opacity: 0, overflow: 'hidden' },
  expanded: { height: 'auto', opacity: 1, overflow: 'visible' },
};

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  allCategories,
  currentSearchTerm,
  currentSelectedCategories,
  currentDateFrom,
  currentDateTo,
}) => {
  const [searchTerm, setSearchTerm] = useState(currentSearchTerm);
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>(currentSelectedCategories);
  const [dateFrom, setDateFrom] = useState(currentDateFrom);
  const [dateTo, setDateTo] = useState(currentDateTo);
  const [showFilters, setShowFilters] = useState(false); // Collapsed by default

  const today = new Date().toISOString().split('T')[0];

  const debouncedSearch = useCallback(
    (term: string, categories: EventCategory[], from: string, to: string) => {
      const handler = setTimeout(() => {
        onSearch(term, categories, from, to);
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

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateFrom = e.target.value;
    if (newDateFrom && newDateFrom < today) {
      alert("Start date cannot be in the past.");
      return;
    }
    if (dateTo && newDateFrom > dateTo) {
      alert("Start date cannot be after end date.");
      return;
    }
    setDateFrom(newDateFrom);
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateTo = e.target.value;
    if (newDateTo && newDateTo < today) {
      alert("End date cannot be in the past.");
      return;
    }
    if (dateFrom && newDateTo < dateFrom) {
      alert("End date cannot be before start date.");
      return;
    }
    setDateTo(newDateTo);
  };

  const clearSearchTerm = () => setSearchTerm('');
  const clearCategories = () => setSelectedCategories([]);
  const clearDateFrom = () => setDateFrom('');
  const clearDateTo = () => setDateTo('');

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
    setDateFrom(currentDateFrom);
  }, [currentDateFrom]);

  useEffect(() => {
    setDateTo(currentDateTo);
  }, [currentDateTo]);

  return (
    <div className="search-component">
      <h2 className="search-heading">Search for events</h2>
      <div className="search-input-container">
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
      </div>

      <div className="filter-controls">
        <button className="filter-toggle-button" onClick={() => setShowFilters(!showFilters)}>
          <FontAwesomeIcon icon={'filter'} className="filter-icon" /> Filters
        </button>
        {(currentSearchTerm || currentSelectedCategories.length > 0 || currentDateFrom || currentDateTo) && (
          <Button variant="unfilled" onClick={clearAllFilters} className="clear-all-button">
            Clear All Filters
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            key="filters"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={filterVariants}
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

            <div className="filter-group">
              <h3>Date From</h3>
              {dateFrom && (
                <button className="clear-filter-button" onClick={clearDateFrom}>
                  &times;
                </button>
              )}
            </div>
            <input
              type="date"
              value={dateFrom}
              onChange={handleDateFromChange}
              className="date-input"
              min={today}
            />

            <div className="filter-group">
              <h3>Date To</h3>
              {dateTo && (
                <button className="clear-filter-button" onClick={clearDateTo}>
                  &times;
                </button>
              )}
            </div>
            <input
              type="date"
              value={dateTo}
              onChange={handleDateToChange}
              className="date-input"
              min={dateFrom || today}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchComponent;
