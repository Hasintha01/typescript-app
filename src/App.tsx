/**
 * Main App Component
 * Weather Dashboard - Entry point
 */

import { useState, useEffect } from 'react';
import type { WeatherData, ForecastData } from './types/weather';
import { WeatherService } from './services/weatherService';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import HourlyForecast from './components/HourlyForecast';
import CurrentLocationButton from './components/CurrentLocationButton';
import TemperatureToggle from './components/TemperatureToggle';
import ThemeToggle from './components/ThemeToggle';
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
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>(getSavedTempUnit());
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

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
      setLastUpdated(new Date());
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
      setLastUpdated(new Date());
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
        <div className="app-header-top">
          <div className="app-title">
            <img src="/weather_app_logo.png" alt="Weather App Logo" className="app-logo" />
            <h1>Weather Dashboard</h1>
          </div>
          <ThemeToggle />
        </div>
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
          <div className="weather-content">
            <WeatherCard weather={weatherData} tempUnit={tempUnit} />
            {forecastData && (
              <>
                <ForecastCard forecast={forecastData} tempUnit={tempUnit} />
                <HourlyForecast forecast={forecastData} tempUnit={tempUnit} />
              </>
            )}
          </div>
        )}

        {!weatherData && !isLoading && !error && (
          <div className="welcome-message">
            <h2>Welcome! 👋</h2>
            <p>Click "Current Location" or search for a city to see weather information</p>
          </div>
        )}
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          {weatherData && lastUpdated && (
            <div className="footer-info">
              <div className="footer-location">
                <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                {weatherData.name}, {weatherData.sys.country}
              </div>
              <div className="footer-coords">
                <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                </svg>
                {weatherData.coord.lat.toFixed(4)}°, {weatherData.coord.lon.toFixed(4)}°
              </div>
              <div className="footer-updated">
                <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                </svg>
                Last Updated: {lastUpdated.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
              <div className="footer-date">
                <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                  <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                </svg>
                {lastUpdated.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          )}
          <div className="footer-credits">
            <p>Powered by OpenWeatherMap API</p>
            <p>© {new Date().getFullYear()} Weather Dashboard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
