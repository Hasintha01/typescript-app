/**
 * ForecastCard Component
 * Displays 5-day weather forecast
 */

import { WeatherService } from '../services/weatherService';
import { formatTemperature, capitalizeWords } from '../utils/helpers';
import type { ForecastData, ForecastItem } from '../types/weather';
import './ForecastCard.css';

interface ForecastCardProps {
  forecast: ForecastData;
  tempUnit?: 'C' | 'F';
}

const ForecastCard = ({ forecast, tempUnit = 'C' }: ForecastCardProps) => {
  // Group forecast by day and get one entry per day (noon time)
  const getDailyForecasts = (): ForecastItem[] => {
    const dailyData: ForecastItem[] = [];
    const processedDates = new Set<string>();

    forecast.list.forEach((item: ForecastItem) => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toLocaleDateString();
      
      // Get forecast around noon (12:00) for each day
      const hour = date.getHours();
      if (!processedDates.has(dateString) && (hour >= 11 && hour <= 14)) {
        processedDates.add(dateString);
        dailyData.push(item);
      }
    });

    return dailyData.slice(0, 5);
  };

  const dailyForecasts = getDailyForecasts();

  // Format day name
  const formatDay = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  return (
    <div className="forecast-card">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-list">
        {dailyForecasts.map((day, index) => {
          const iconUrl = WeatherService.getWeatherIconUrl(day.weather[0].icon);
          
          return (
            <div 
              key={index} 
              className="forecast-item"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="forecast-day">{formatDay(day.dt)}</div>
              <img 
                src={iconUrl} 
                alt={day.weather[0].description}
                className="forecast-icon"
              />
              <div className="forecast-temp">
                {formatTemperature(day.main.temp, tempUnit)}
              </div>
              <div className="forecast-desc">
                {capitalizeWords(day.weather[0].description)}
              </div>
              <div className="forecast-details">
                <span className="forecast-detail">
                  <svg className="detail-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v.756a49.106 49.106 0 019.152 1 .75.75 0 01-.152 1.485h-1.918l2.474 10.124a.75.75 0 01-.375.84A6.723 6.723 0 0118.75 18a6.723 6.723 0 01-3.181-.795.75.75 0 01-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 01-.262 1.453h-8.37a.75.75 0 01-.262-1.453c1.162-.433 2.404-.7 3.697-.776V6.24H6.332l2.474 10.124a.75.75 0 01-.375.84A6.723 6.723 0 015.25 18a6.723 6.723 0 01-3.181-.795.75.75 0 01-.375-.84L4.168 6.241H2.25a.75.75 0 01-.152-1.485 49.105 49.105 0 019.152-1V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
                  </svg>
                  {day.main.humidity}%
                </span>
                <span className="forecast-detail">
                  <svg className="detail-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                    <path d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {Math.round(day.wind.speed * 3.6)} km/h
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;
