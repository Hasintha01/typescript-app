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
  // Get hourly forecasts for next 33 hours (11 entries, 3-hour intervals)
  const getHourlyForecasts = (): ForecastItem[] => {
    return forecast.list.slice(0, 11);
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
                  <span className="hourly-detail">
                    <svg className="detail-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v.756a49.106 49.106 0 019.152 1 .75.75 0 01-.152 1.485h-1.918l2.474 10.124a.75.75 0 01-.375.84A6.723 6.723 0 0118.75 18a6.723 6.723 0 01-3.181-.795.75.75 0 01-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 01-.262 1.453h-8.37a.75.75 0 01-.262-1.453c1.162-.433 2.404-.7 3.697-.776V6.24H6.332l2.474 10.124a.75.75 0 01-.375.84A6.723 6.723 0 015.25 18a6.723 6.723 0 01-3.181-.795.75.75 0 01-.375-.84L4.168 6.241H2.25a.75.75 0 01-.152-1.485 49.105 49.105 0 019.152-1V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                    {hour.main.humidity}%
                  </span>
                  <span className="hourly-detail">
                    <svg className="detail-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                      <path d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {Math.round(hour.wind.speed * 3.6)}
                  </span>
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
