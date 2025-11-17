/**
 * WeatherCardSkeleton Component
 * Loading skeleton for WeatherCard
 */

import './WeatherCardSkeleton.css';

const WeatherCardSkeleton = () => {
  return (
    <div className="weather-card skeleton">
      <div className="skeleton-header">
        <div className="skeleton-title"></div>
        <div className="skeleton-subtitle"></div>
      </div>

      <div className="skeleton-main">
        <div className="skeleton-icon"></div>
        <div className="skeleton-temp-section">
          <div className="skeleton-temperature"></div>
          <div className="skeleton-description"></div>
        </div>
      </div>

      <div className="skeleton-details">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="skeleton-detail-item">
            <div className="skeleton-detail-label"></div>
            <div className="skeleton-detail-value"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCardSkeleton;
