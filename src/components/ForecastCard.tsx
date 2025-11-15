/**
 * ForecastCard Component
 * Displays 5-day weather forecast
 */

import { WeatherService } from '../services/weatherService';
import { formatTemperature, capitalizeWords } from '../utils/helpers';
import './ForecastCard.css';

interface ForecastCardProps {
  forecast: any;
  tempUnit?: 'C' | 'F';
}

const ForecastCard = ({ forecast, tempUnit = 'C' }: ForecastCardProps) => {
  // Group forecast by day and get one entry per day (noon time)
  const getDailyForecasts = () => {
    const dailyData: any[] = [];
    const processedDates = new Set();

    forecast.list.forEach((item: any) => {
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
            <div key={index} className="forecast-item">
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
                <span className="forecast-detail">💧 {day.main.humidity}%</span>
                <span className="forecast-detail">💨 {Math.round(day.wind.speed * 3.6)} km/h</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;
