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
