/**
 * Helper Utilities
 * Common functions for formatting and conversions
 */

// Convert Unix timestamp to readable time
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

// Convert Celsius to Fahrenheit
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

// Format temperature with degree symbol and unit conversion
export const formatTemperature = (tempCelsius: number, unit: 'C' | 'F' = 'C'): string => {
  const temp = unit === 'F' ? celsiusToFahrenheit(tempCelsius) : tempCelsius;
  return `${Math.round(temp)}°${unit}`;
};

// Capitalize first letter of each word
export const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Convert wind speed from m/s to km/h
export const msToKmh = (speedMs: number): number => {
  return Math.round(speedMs * 3.6);
};

// Get compass direction from degrees
export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

// Check if weather condition is severe
export const isSevereWeather = (weatherId: number): boolean => {
  // Weather condition codes that indicate severe weather
  // 2xx: Thunderstorm, 5xx: Rain (heavy), 6xx: Snow (heavy), 7xx: Atmosphere
  return (
    (weatherId >= 200 && weatherId < 300) || // Thunderstorms
    weatherId === 502 || weatherId === 503 || weatherId === 504 || // Heavy rain
    weatherId === 511 || // Freezing rain
    (weatherId >= 602 && weatherId <= 622) || // Heavy snow
    weatherId === 781 // Tornado
  );
};

// Get severity level based on weather conditions
export const getWeatherSeverity = (weatherId: number, windSpeed: number, visibility: number): {
  level: 'normal' | 'caution' | 'warning' | 'severe';
  message: string;
} => {
  // Severe weather conditions
  if (isSevereWeather(weatherId)) {
    if (weatherId >= 200 && weatherId < 300) {
      return { level: 'severe', message: 'Thunderstorm Alert' };
    }
    if (weatherId === 781) {
      return { level: 'severe', message: 'Tornado Warning' };
    }
    if (weatherId === 511) {
      return { level: 'severe', message: 'Freezing Rain Warning' };
    }
    return { level: 'warning', message: 'Severe Weather Alert' };
  }

  // High wind warning (>50 km/h or 13.9 m/s)
  if (windSpeed > 13.9) {
    return { level: 'warning', message: 'High Wind Warning' };
  }

  // Low visibility caution (<1000m)
  if (visibility < 1000) {
    return { level: 'caution', message: 'Low Visibility' };
  }

  // Moderate rain/snow
  if ((weatherId >= 500 && weatherId < 600) || (weatherId >= 600 && weatherId < 700)) {
    return { level: 'caution', message: 'Precipitation Alert' };
  }

  return { level: 'normal', message: '' };
};;
