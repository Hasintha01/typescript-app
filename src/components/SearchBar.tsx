/**
 * SearchBar Component
 * Input field for searching weather by city name with autocomplete
 */

import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { WeatherService, type GeoLocation } from '../services/weatherService';
import { useDebounce } from '../utils/useDebounce';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  // Track city input and suggestions
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce the city input to avoid excessive API calls (300ms delay)
  const debouncedCity = useDebounce(city, 300);

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  // Handle input change
  const handleInputChange = (value: string) => {
    setCity(value);
    setSelectedIndex(-1);

    // Clear suggestions if input is too short
    if (value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Fetch suggestions when debounced city changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedCity.trim().length >= 2) {
        try {
          const results = await WeatherService.searchCities(debouncedCity.trim());
          setSuggestions(results || []);
          setShowSuggestions((results || []).length > 0);
        } catch (error) {
          console.error('Error fetching city suggestions:', error);
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }
    };

    fetchSuggestions();
  }, [debouncedCity]);

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: GeoLocation) => {
    const cityName = suggestion.state
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;
    setCity(cityName);
    onSearch(cityName);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-bar" ref={searchRef}>
      <form onSubmit={handleSubmit} role="search" aria-label="Search for weather by city">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={city}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter city name..."
            disabled={isLoading}
            className="search-input"
            autoComplete="off"
            aria-label="City name"
            aria-autocomplete="list"
            aria-controls={showSuggestions ? 'suggestions-list' : undefined}
            aria-expanded={showSuggestions}
            aria-activedescendant={selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul
              className="suggestions-list"
              id="suggestions-list"
              role="listbox"
              aria-label="City suggestions"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={`${suggestion.name}-${suggestion.country}-${suggestion.lat}-${suggestion.lon}`}
                  id={`suggestion-${index}`}
                  className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <span className="suggestion-name">{suggestion.name}</span>
                  <span className="suggestion-location">
                    {suggestion.state ? `${suggestion.state}, ` : ''}
                    {suggestion.country}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || !city.trim()}
          className="search-button"
          aria-label="Search for weather"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
