import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';
import { WeatherService } from '../services/weatherService';

// Mock the WeatherService
vi.mock('../services/weatherService', () => ({
  WeatherService: {
    searchCities: vi.fn(),
  },
}));

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();
  const mockSearchCities = vi.mocked(WeatherService.searchCities);

  beforeEach(() => {
    vi.clearAllMocks();
    // Set a default resolved value to prevent undefined errors
    mockSearchCities.mockResolvedValue([]);
  });

  it('renders search input and button', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

    expect(screen.getByPlaceholderText('Enter city name...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search for weather' })).toBeInTheDocument();
  });

  it('calls onSearch when form is submitted with city name', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

    const input = screen.getByPlaceholderText('Enter city name...');
    const button = screen.getByRole('button', { name: 'Search for weather' });

    await user.type(input, 'London');
    await user.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('London');
  });

  it('does not call onSearch when input is empty', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

    const button = screen.getByRole('button', { name: 'Search for weather' });
    await user.click(button);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('trims whitespace from city name before searching', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

    const input = screen.getByPlaceholderText('Enter city name...');
    await user.type(input, '  London  ');
    await user.click(screen.getByRole('button', { name: 'Search for weather' }));

    expect(mockOnSearch).toHaveBeenCalledWith('London');
  });

  it('disables input and button when isLoading is true', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={true} />);

    const input = screen.getByPlaceholderText('Enter city name...');
    const button = screen.getByRole('button', { name: 'Search for weather' });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('changes button text to "Searching..." when loading', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={true} />);

    expect(screen.getByText('Searching...')).toBeInTheDocument();
  });

  it('disables button when input is empty', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

    const button = screen.getByRole('button', { name: 'Search for weather' });
    expect(button).toBeDisabled();
  });

  it('enables button when input has text', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

    const input = screen.getByPlaceholderText('Enter city name...');
    const button = screen.getByRole('button', { name: 'Search for weather' });

    expect(button).toBeDisabled();

    await user.type(input, 'London');
    expect(button).not.toBeDisabled();
  });

  it('fetches suggestions when typing at least 2 characters', async () => {
    const user = userEvent.setup();
    const mockSuggestions = [
      { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
      { name: 'London', country: 'CA', state: 'Ontario', lat: 42.9834, lon: -81.2497 },
    ];

    mockSearchCities.mockResolvedValue(mockSuggestions);

    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

    const input = screen.getByPlaceholderText('Enter city name...');
    await user.type(input, 'Lo');

    await waitFor(() => {
      expect(mockSearchCities).toHaveBeenCalledWith('Lo');
    });
  });

  it('displays suggestions when available', async () => {
    const user = userEvent.setup();
    const mockSuggestions = [
      { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
      { name: 'London', country: 'CA', state: 'Ontario', lat: 42.9834, lon: -81.2497 },
    ];

    mockSearchCities.mockResolvedValue(mockSuggestions);

    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

    const input = screen.getByPlaceholderText('Enter city name...');
    await user.type(input, 'London');

    await waitFor(() => {
      const londonElements = screen.getAllByText('London');
      expect(londonElements.length).toBe(2);
      expect(screen.getByText('GB')).toBeInTheDocument();
      expect(screen.getByText('Ontario, CA')).toBeInTheDocument();
    });
  });

  it('selects suggestion when clicked', async () => {
    const user = userEvent.setup();
    const mockSuggestions = [{ name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 }];

    mockSearchCities.mockResolvedValue(mockSuggestions);

    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

    const input = screen.getByPlaceholderText('Enter city name...');
    await user.type(input, 'London');

    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
    });

    const suggestion = screen.getByText('London');
    await user.click(suggestion);

    expect(mockOnSearch).toHaveBeenCalledWith('London, GB');
  });

  it('does not fetch suggestions for single character', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

    const input = screen.getByPlaceholderText('Enter city name...');
    await user.type(input, 'L');

    await waitFor(() => {
      expect(mockSearchCities).not.toHaveBeenCalled();
    });
  });

  it('handles keyboard navigation with arrow keys', async () => {
    const user = userEvent.setup();
    const mockSuggestions = [
      { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
      { name: 'Los Angeles', country: 'US', state: 'California', lat: 34.0522, lon: -118.2437 },
    ];

    mockSearchCities.mockResolvedValue(mockSuggestions);

    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

    const input = screen.getByPlaceholderText('Enter city name...');
    await user.type(input, 'Lo');

    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
    });

    // Arrow down should select first item
    await user.keyboard('{ArrowDown}');

    // Arrow down again should select second item
    await user.keyboard('{ArrowDown}');

    // Enter should select the highlighted suggestion
    await user.keyboard('{Enter}');

    expect(mockOnSearch).toHaveBeenCalledWith('Los Angeles, California, US');
  });
});
