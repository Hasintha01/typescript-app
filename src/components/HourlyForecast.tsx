/**
 * HourlyForecast Component
 * Displays hourly weather forecast for next 24 hours
 */

import { WeatherService } from '../services/weatherService';
import { formatTemperature, capitalizeWords } from '../utils/helpers';
import type { ForecastData, ForecastItem } from '../types/weather';
import './HourlyForecast.css';

interface HourlyForecastProps {
  forecast: ForecastData;
  tempUnit?: 'C' | 'F';
}

const HourlyForecast = ({ forecast, tempUnit = 'C' }: HourlyForecastProps) => {
  // Get hourly forecasts for next 24 hours (8 entries, 3-hour intervals)
  const getHourlyForecasts = (): ForecastItem[] => {
    return forecast.list.slice(0, 8);
  };

  const hourlyData: ForecastItem[] = getHourlyForecasts();

  // Format hour display
  const formatHour = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    
    // Check if it's today
    if (date.toDateString() === now.toDateString()) {
      if (Math.abs(date.getTime() - now.getTime()) < 1.5 * 60 * 60 * 1000) {
        return 'Now';
      }
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        hour12: true 
      });
    }
    
    // Show day + time for tomorrow
    return date.toLocaleTimeString('en-US', { 
      weekday: 'short',
      hour: 'numeric', 
      hour12: true 
    });
  };

  return (
    <div className="hourly-forecast">
      <h3 className="hourly-title">Hourly Forecast</h3>
      <div className="hourly-scroll">
        <div className="hourly-list">
          {hourlyData.map((hour: ForecastItem, index: number) => {
            const iconUrl = WeatherService.getWeatherIconUrl(hour.weather[0].icon);
            
            return (
              <div 
                key={index} 
                className="hourly-item"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="hourly-time">{formatHour(hour.dt)}</div>
                <img 
                  src={iconUrl} 
                  alt={hour.weather[0].description}
                  className="hourly-icon"
                />
                <div className="hourly-temp">
                  {formatTemperature(hour.main.temp, tempUnit)}
                </div>
                <div className="hourly-desc">
                  {capitalizeWords(hour.weather[0].main)}
                </div>
                <div className="hourly-details">
                  <span className="hourly-detail">💧 {hour.main.humidity}%</span>
                  <span className="hourly-detail">💨 {Math.round(hour.wind.speed * 3.6)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
