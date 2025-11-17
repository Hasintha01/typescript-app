/**
 * ForecastCardSkeleton Component
 * Loading skeleton for ForecastCard
 */

import './ForecastCardSkeleton.css';

const ForecastCardSkeleton = () => {
  return (
    <div className="forecast-card skeleton">
      <div className="skeleton-forecast-title"></div>
      <div className="skeleton-forecast-list">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton-forecast-item">
            <div className="skeleton-forecast-day"></div>
            <div className="skeleton-forecast-icon"></div>
            <div className="skeleton-forecast-temp"></div>
            <div className="skeleton-forecast-desc"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCardSkeleton;
