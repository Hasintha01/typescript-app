import { useState } from 'react';
import type { WeatherData } from './types/weather';
import { WeatherService } from './services/weatherService';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await WeatherService.getWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌤️ Weather Dashboard</h1>
        <p className="app-subtitle">Get real-time weather information for any city</p>
      </header>

      <main className="app-main">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        {isLoading && <Loading />}
        
        {error && <ErrorMessage message={error} onRetry={handleRetry} />}
        
        {weatherData && !isLoading && !error && (
          <WeatherCard weather={weatherData} />
        )}

        {!weatherData && !isLoading && !error && (
          <div className="welcome-message">
            <h2>Welcome! 👋</h2>
            <p>Search for a city to see its current weather conditions</p>
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
