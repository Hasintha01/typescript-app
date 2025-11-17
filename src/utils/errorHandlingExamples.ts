/**
 * Example: Using Error Handling in Components
 */

import { WeatherService } from '../services/weatherService';
import { WeatherServiceError, WeatherErrorType } from '../types/weather';
import { getErrorMessage, isRetryableError } from '../utils/errorUtils';

// Example 1: Basic error handling with retry logic
export async function fetchWeatherWithRetry(city: string, retries = 2) {
  try {
    const weather = await WeatherService.getWeatherByCity(city);
    return weather;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    const canRetry = isRetryableError(error);
    
    console.error('Error fetching weather:', errorMessage);
    
    if (canRetry && retries > 0) {
      console.log(`Retrying... (${retries} attempts remaining)`);
      return fetchWeatherWithRetry(city, retries - 1);
    }
    
    throw error;
  }
}

// Example 2: Display specific error messages to users
export function handleWeatherError(error: unknown) {
  if (error instanceof WeatherServiceError) {
    switch (error.type) {
      case WeatherErrorType.CITY_NOT_FOUND:
        return 'City not found. Please check the spelling and try again.';
      case WeatherErrorType.NETWORK_ERROR:
        return 'Network error. Please check your connection and try again.';
      case WeatherErrorType.RATE_LIMIT:
        return 'Too many requests. Please wait a moment and try again.';
      case WeatherErrorType.API_KEY_MISSING:
        return 'API configuration error. Please contact support.';
      default:
        return 'An unexpected error occurred.';
    }
  }
  return getErrorMessage(error);
}

// Example 3: React component with error handling
/*
function WeatherComponent() {
  const [error, setError] = useState<string | null>(null);
  const [canRetry, setCanRetry] = useState(false);

  const fetchWeather = async (city: string) => {
    try {
      setError(null);
      const weather = await WeatherService.getWeatherByCity(city);
      // Handle success
    } catch (err) {
      setError(handleWeatherError(err));
      setCanRetry(isRetryableError(err));
    }
  };

  return (
    <div>
      {error && (
        <div className="error">
          {error}
          {canRetry && <button onClick={() => fetchWeather('London')}>Retry</button>}
        </div>
      )}
    </div>
  );
}
*/
