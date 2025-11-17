/**
 * Weather Service
 * Handles all API calls to OpenWeatherMap
 */

import type { WeatherData, WeatherError, ForecastData } from '../types/weather';
import { WeatherServiceError, WeatherErrorType } from '../types/weather';

// API configuration
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // milliseconds

// Types for geocoding
export interface GeoLocation {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export class WeatherService {
  // Helper method to handle API errors
  private static handleApiError(response: Response, errorData: WeatherError): never {
    const statusCode = response.status;
    
    if (statusCode === 404) {
      throw new WeatherServiceError(
        'City not found. Please check the spelling and try again.',
        WeatherErrorType.CITY_NOT_FOUND,
        false,
        statusCode
      );
    } else if (statusCode === 401) {
      throw new WeatherServiceError(
        'Invalid API key. Please check your configuration.',
        WeatherErrorType.API_KEY_MISSING,
        false,
        statusCode
      );
    } else if (statusCode === 429) {
      throw new WeatherServiceError(
        'Too many requests. Please try again in a moment.',
        WeatherErrorType.RATE_LIMIT,
        true,
        statusCode
      );
    } else if (statusCode >= 500) {
      throw new WeatherServiceError(
        'Weather service is temporarily unavailable. Please try again later.',
        WeatherErrorType.NETWORK_ERROR,
        true,
        statusCode
      );
    }
    
    throw new WeatherServiceError(
      errorData.message || 'Failed to fetch weather data',
      WeatherErrorType.UNKNOWN,
      statusCode >= 500,
      statusCode
    );
  }

  // Helper method for retry logic
  private static async fetchWithRetry<T>(
    fetchFn: () => Promise<T>,
    retries: number = MAX_RETRIES
  ): Promise<T> {
    try {
      return await fetchFn();
    } catch (error) {
      if (error instanceof WeatherServiceError && error.retryable && retries > 0) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return this.fetchWithRetry(fetchFn, retries - 1);
      }
      throw error;
    }
  }
  // Fetch weather by city name
  static async getWeatherByCity(city: string): Promise<WeatherData> {
    if (!API_KEY) {
      throw new WeatherServiceError(
        'API key is not configured. Please add VITE_WEATHER_API_KEY to your .env file',
        WeatherErrorType.API_KEY_MISSING,
        false
      );
    }

    if (!city || city.trim() === '') {
      throw new WeatherServiceError(
        'City name is required',
        WeatherErrorType.INVALID_INPUT,
        false
      );
    }

    return this.fetchWithRetry(async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          const errorData: WeatherError = await response.json();
          this.handleApiError(response, errorData);
        }

        const data: WeatherData = await response.json();
        return data;
      } catch (error) {
        if (error instanceof WeatherServiceError) {
          throw error;
        }
        throw new WeatherServiceError(
          'Network error. Please check your internet connection.',
          WeatherErrorType.NETWORK_ERROR,
          true
        );
      }
    });
  }

  // Fetch weather by GPS coordinates
  static async getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
    if (!API_KEY) {
      throw new WeatherServiceError(
        'API key is not configured. Please add VITE_WEATHER_API_KEY to your .env file',
        WeatherErrorType.API_KEY_MISSING,
        false
      );
    }

    return this.fetchWithRetry(async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          const errorData: WeatherError = await response.json();
          this.handleApiError(response, errorData);
        }

        const data: WeatherData = await response.json();
        return data;
      } catch (error) {
        if (error instanceof WeatherServiceError) {
          throw error;
        }
        throw new WeatherServiceError(
          'Network error. Please check your internet connection.',
          WeatherErrorType.NETWORK_ERROR,
          true
        );
      }
    });
  }

  // Get icon URL from icon code
  static getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  // Get 5-day forecast by city name
  static async getForecastByCity(city: string): Promise<ForecastData> {
    if (!API_KEY) {
      throw new WeatherServiceError(
        'API key is not configured. Please add VITE_WEATHER_API_KEY to your .env file',
        WeatherErrorType.API_KEY_MISSING,
        false
      );
    }

    if (!city || city.trim() === '') {
      throw new WeatherServiceError(
        'City name is required',
        WeatherErrorType.INVALID_INPUT,
        false
      );
    }

    return this.fetchWithRetry(async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          const errorData: WeatherError = await response.json();
          this.handleApiError(response, errorData);
        }

        const data: ForecastData = await response.json();
        return data;
      } catch (error) {
        if (error instanceof WeatherServiceError) {
          throw error;
        }
        throw new WeatherServiceError(
          'Network error. Please check your internet connection.',
          WeatherErrorType.NETWORK_ERROR,
          true
        );
      }
    });
  }

  // Get 5-day forecast by coordinates
  static async getForecastByCoordinates(lat: number, lon: number): Promise<ForecastData> {
    if (!API_KEY) {
      throw new WeatherServiceError(
        'API key is not configured. Please add VITE_WEATHER_API_KEY to your .env file',
        WeatherErrorType.API_KEY_MISSING,
        false
      );
    }

    return this.fetchWithRetry(async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          const errorData: WeatherError = await response.json();
          this.handleApiError(response, errorData);
        }

        const data: ForecastData = await response.json();
        return data;
      } catch (error) {
        if (error instanceof WeatherServiceError) {
          throw error;
        }
        throw new WeatherServiceError(
          'Network error. Please check your internet connection.',
          WeatherErrorType.NETWORK_ERROR,
          true
        );
      }
    });
  }

  // Search cities for autocomplete (supports up to 15 results)
  static async searchCities(query: string, limit: number = 15): Promise<GeoLocation[]> {
    if (!API_KEY) {
      throw new Error('API key is not configured');
    }

    if (!query || query.trim().length < 2) {
      return [];
    }

    try {
      const response = await fetch(
        `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_KEY}`
      );

      if (!response.ok) {
        return [];
      }

      const data: GeoLocation[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching cities:', error);
      return [];
    }
  }
}
