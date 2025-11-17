/**
 * useGeolocation Hook
 * Handles geolocation functionality and current location detection
 */

import { useState, useEffect } from 'react';

interface GeolocationState {
  isAvailable: boolean;
  isLoading: boolean;
  error: string | null;
  coordinates: { latitude: number; longitude: number } | null;
}

export const useGeolocation = (autoFetch: boolean = false) => {
  const [state, setState] = useState<GeolocationState>({
    isAvailable: 'geolocation' in navigator,
    isLoading: false,
    error: null,
    coordinates: null,
  });

  const getCurrentPosition = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setState({
            isAvailable: true,
            isLoading: false,
            error: null,
            coordinates: coords,
          });
          resolve(coords);
        },
        (error) => {
          let errorMessage = 'Failed to get your location';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied. Please enable location access.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
          }

          setState({
            isAvailable: true,
            isLoading: false,
            error: errorMessage,
            coordinates: null,
          });
          reject(new Error(errorMessage));
        }
      );
    });
  };

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch && state.isAvailable) {
      getCurrentPosition().catch(() => {
        // Error already handled in state
      });
    }
  }, [autoFetch]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...state,
    getCurrentPosition,
  };
};
