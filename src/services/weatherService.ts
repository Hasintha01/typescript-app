import type { WeatherData, WeatherError } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export class WeatherService {
  /**
   * Fetch weather data for a specific city
   * @param city - City name
   * @returns Promise with weather data
   */
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

  /**
   * Fetch weather data by coordinates
   * @param lat - Latitude
   * @param lon - Longitude
   * @returns Promise with weather data
   */
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

  /**
   * Get weather icon URL
   * @param iconCode - Weather icon code from API
   * @returns Full URL to weather icon
   */
  static getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}
