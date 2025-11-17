/**
 * useWeather Hook
 * Manages weather data fetching and state
 */

import { useState } from 'react';
import type { WeatherData, ForecastData } from '../types/weather';
import { WeatherService } from '../services/weatherService';

interface WeatherState {
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export const useWeather = () => {
  const [state, setState] = useState<WeatherState>({
    weatherData: null,
    forecastData: null,
    isLoading: false,
    error: null,
    lastUpdated: null,
  });

  // Fetch weather data for searched city
  const fetchWeatherByCity = async (city: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const [weather, forecast] = await Promise.all([
        WeatherService.getWeatherByCity(city),
        WeatherService.getForecastByCity(city),
      ]);

      setState({
        weatherData: weather,
        forecastData: forecast,
        isLoading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (err) {
      setState({
        weatherData: null,
        forecastData: null,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch weather data',
        lastUpdated: null,
      });
    }
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoordinates = async (lat: number, lon: number) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const [weather, forecast] = await Promise.all([
        WeatherService.getWeatherByCoordinates(lat, lon),
        WeatherService.getForecastByCoordinates(lat, lon),
      ]);

      setState({
        weatherData: weather,
        forecastData: forecast,
        isLoading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (err) {
      setState({
        weatherData: null,
        forecastData: null,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch weather data',
        lastUpdated: null,
      });
    }
  };

  // Clear error message
  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  return {
    ...state,
    fetchWeatherByCity,
    fetchWeatherByCoordinates,
    clearError,
  };
};
