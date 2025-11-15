/**
 * Main App Component
 * Weather Dashboard - Entry point
 */

import { useState, useEffect } from 'react';
import type { WeatherData } from './types/weather';
import { WeatherService } from './services/weatherService';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import HourlyForecast from './components/HourlyForecast';
import CurrentLocationButton from './components/CurrentLocationButton';
import TemperatureToggle from './components/TemperatureToggle';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  // Get saved temperature unit from localStorage or default to Celsius
  const getSavedTempUnit = (): 'C' | 'F' => {
    const saved = localStorage.getItem('tempUnit');
    return (saved === 'F' || saved === 'C') ? saved : 'C';
  };

  // State management
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>(getSavedTempUnit());

  // Load current location weather on initial load
  useEffect(() => {
    if (!hasLoadedInitial && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleLocationSearch(latitude, longitude);
          setHasLoadedInitial(true);
        },
        () => {
          // If geolocation fails, just mark as loaded
          setHasLoadedInitial(true);
        }
      );
    }
  }, [hasLoadedInitial]);

  // Fetch weather data for searched city
  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [weather, forecast] = await Promise.all([
        WeatherService.getWeatherByCity(city),
        WeatherService.getForecastByCity(city)
      ]);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch weather by coordinates
  const handleLocationSearch = async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [weather, forecast] = await Promise.all([
        WeatherService.getWeatherByCoordinates(lat, lon),
        WeatherService.getForecastByCoordinates(lat, lon)
      ]);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear error message
  const handleRetry = () => {
    setError(null);
  };

  // Handle temperature unit toggle
  const handleTempUnitToggle = (unit: 'C' | 'F') => {
    setTempUnit(unit);
    localStorage.setItem('tempUnit', unit);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌤️ Weather Dashboard</h1>
        <p className="app-subtitle">Get real-time weather information for any city</p>
        <TemperatureToggle unit={tempUnit} onToggle={handleTempUnitToggle} />
      </header>

      <main className="app-main">
        <CurrentLocationButton 
          onLocationFound={handleLocationSearch}
          isLoading={isLoading}
        />
        
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        {isLoading && <Loading />}
        
        {error && <ErrorMessage message={error} onRetry={handleRetry} />}
        
        {weatherData && !isLoading && !error && (
          <>
            <WeatherCard weather={weatherData} tempUnit={tempUnit} />
            {forecastData && (
              <>
                <HourlyForecast forecast={forecastData} tempUnit={tempUnit} />
                <ForecastCard forecast={forecastData} tempUnit={tempUnit} />
              </>
            )}
          </>
        )}

        {!weatherData && !isLoading && !error && (
          <div className="welcome-message">
            <h2>Welcome! 👋</h2>
            <p>Click "Current Location" or search for a city to see weather information</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by OpenWeatherMap API</p>
      </footer>
    </div>
  );
}

export default App;
