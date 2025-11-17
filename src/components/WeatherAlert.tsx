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
  const getIconSVG = () => {
    switch (level) {
      case 'severe':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
          </svg>
        );
      case 'warning':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
        );
      case 'caution':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
        );
    }
  };

  return (
    <div className={`weather-alert alert-${level}`}>
      <div className="alert-header">
        <span className="alert-icon">{getIconSVG()}</span>
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
