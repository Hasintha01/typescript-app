/**
 * Weather Service
 * Handles all API calls to OpenWeatherMap
 */

import type { WeatherData, WeatherError } from '../types/weather';

// API configuration
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// Types for geocoding
export interface GeoLocation {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export class WeatherService {
  // Fetch weather by city name
  static async getWeatherByCity(city: string): Promise<WeatherData> {
    if (!API_KEY) {
      throw new Error('API key is not configured. Please add VITE_WEATHER_API_KEY to your .env file');
    }

    if (!city || city.trim() === '') {
      throw new Error('City name is required');
    }

    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        const errorData: WeatherError = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }

      const data: WeatherData = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while fetching weather data');
    }
  }

  // Fetch weather by GPS coordinates
  static async getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
    if (!API_KEY) {
      throw new Error('API key is not configured. Please add VITE_WEATHER_API_KEY to your .env file');
    }

    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        const errorData: WeatherError = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }

      const data: WeatherData = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while fetching weather data');
    }
  }

  // Get icon URL from icon code
  static getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  // Get 5-day forecast by city name
  static async getForecastByCity(city: string): Promise<any> {
    if (!API_KEY) {
      throw new Error('API key is not configured. Please add VITE_WEATHER_API_KEY to your .env file');
    }

    if (!city || city.trim() === '') {
      throw new Error('City name is required');
    }

    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch forecast data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while fetching forecast data');
    }
  }

  // Get 5-day forecast by coordinates
  static async getForecastByCoordinates(lat: number, lon: number): Promise<any> {
    if (!API_KEY) {
      throw new Error('API key is not configured. Please add VITE_WEATHER_API_KEY to your .env file');
    }

    try {
      const response = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch forecast data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while fetching forecast data');
    }
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
