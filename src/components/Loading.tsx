/**
 * Loading Component
 * Displays a spinner while fetching weather data
 */

import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading weather data...</p>
    </div>
  );
};

export default Loading;
