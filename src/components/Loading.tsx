/**
 * Loading Component
 * Displays a spinner while fetching weather data
 */

import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container" role="status" aria-live="polite" aria-busy="true">
      <div className="loading-spinner" aria-hidden="true"></div>
      <p>Loading weather data...</p>
      <span className="sr-only">Loading weather information, please wait...</span>
    </div>
  );
};

export default Loading;
