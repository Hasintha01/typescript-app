/**
 * WeatherAlert Component
 * Displays weather warnings and alerts
 */

import './WeatherAlert.css';

interface WeatherAlertProps {
  level: 'caution' | 'warning' | 'severe';
  message: string;
  details?: string;
}

const WeatherAlert = ({ level, message, details }: WeatherAlertProps) => {
  // Get icon based on severity level
  const getIcon = () => {
    switch (level) {
      case 'severe':
        return '🚨';
      case 'warning':
        return '⚠️';
      case 'caution':
        return '⚡';
      default:
        return '⚠️';
    }
  };

  return (
    <div className={`weather-alert alert-${level}`}>
      <div className="alert-header">
        <span className="alert-icon">{getIcon()}</span>
        <span className="alert-message">{message}</span>
      </div>
      {details && (
        <div className="alert-details">
          {details}
        </div>
      )}
    </div>
  );
};

export default WeatherAlert;
