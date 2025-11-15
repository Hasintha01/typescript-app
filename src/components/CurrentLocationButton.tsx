/**
 * CurrentLocationButton Component
 * Button to get weather for user's current GPS location
 */

import { useState } from 'react';
import './CurrentLocationButton.css';

interface CurrentLocationButtonProps {
  onLocationFound: (lat: number, lon: number) => void;
  isLoading: boolean;
}

const CurrentLocationButton = ({ onLocationFound, isLoading }: CurrentLocationButtonProps) => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Get user's current location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationFound(latitude, longitude);
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please check your browser permissions.');
        setIsGettingLocation(false);
      }
    );
  };

  return (
    <button
      onClick={handleGetLocation}
      disabled={isLoading || isGettingLocation}
      className="location-button"
      title="Get current location weather"
    >
      <span className="location-icon">📍</span>
      {isGettingLocation ? 'Getting Location...' : 'Current Location'}
    </button>
  );
};

export default CurrentLocationButton;
