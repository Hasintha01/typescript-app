/**
 * WeatherCard Component
 * Displays detailed weather information for a city
 */

import type { WeatherData } from '../types/weather';
import { WeatherService } from '../services/weatherService';
import { 
  formatTemperature, 
  capitalizeWords, 
  formatTimestamp, 
  msToKmh, 
  getWindDirection,
  getWeatherSeverity
} from '../utils/helpers';
import WeatherAlert from './WeatherAlert';
import './WeatherCard.css';

interface WeatherCardProps {
  weather: WeatherData;
  tempUnit?: 'C' | 'F';
}

const WeatherCard = ({ weather, tempUnit = 'C' }: WeatherCardProps) => {
  // Get icon URL from weather data
  const iconUrl = WeatherService.getWeatherIconUrl(weather.weather[0].icon);
  
  // Check for severe weather conditions
  const severity = getWeatherSeverity(
    weather.weather[0].id,
    weather.wind.speed,
    weather.visibility
  );

  // Get card class based on severity
  const getCardClass = () => {
    let classes = 'weather-card';
    if (severity.level === 'severe') classes += ' severe-weather';
    if (severity.level === 'warning') classes += ' warning-weather';
    return classes;
  };

  return (
    <div className={getCardClass()}>
      {/* Show alert if weather is severe */}
      {severity.level !== 'normal' && (
        <WeatherAlert 
          level={severity.level}
          message={severity.message}
          details={`Current conditions: ${capitalizeWords(weather.weather[0].description)}`}
        />
      )}
      
      <div className="weather-card-header">
        <h2 className="city-name">
          {weather.name}, {weather.sys.country}
        </h2>
        <p className="weather-date">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="weather-main">
        <img 
          src={iconUrl} 
          alt={weather.weather[0].description}
          className="weather-icon"
        />
        <div className="temperature-section">
          <div className="temperature">
            {formatTemperature(weather.main.temp, tempUnit)}
          </div>
          <div className="weather-description">
            {capitalizeWords(weather.weather[0].description)}
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Feels Like</span>
          <span className="detail-value">
            {formatTemperature(weather.main.feels_like, tempUnit)}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weather.main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">
            {msToKmh(weather.wind.speed)} km/h {getWindDirection(weather.wind.deg)}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{weather.main.pressure} hPa</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Sunrise</span>
          <span className="detail-value">{formatTimestamp(weather.sys.sunrise)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Sunset</span>
          <span className="detail-value">{formatTimestamp(weather.sys.sunset)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Min / Max</span>
          <span className="detail-value">
            {formatTemperature(weather.main.temp_min, tempUnit)} / {formatTemperature(weather.main.temp_max, tempUnit)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
