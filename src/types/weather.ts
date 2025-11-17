/**
 * Weather Types
 * Type definitions for OpenWeatherMap API responses
 */

// Main weather response structure
export interface WeatherData {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  clouds: CloudData;
  dt: number;
  sys: SystemData;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// Geographic coordinates
export interface Coordinates {
  lon: number;
  lat: number;
}

// Weather condition details
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// Temperature and atmospheric data
export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

// Wind information
export interface WindData {
  speed: number;
  deg: number;
  gust?: number;
}

// Cloud coverage
export interface CloudData {
  all: number;
}

// System data (country, sunrise, sunset)
export interface SystemData {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

// API error response
export interface WeatherError {
  cod: string | number;
  message: string;
}

// Custom error types for better error handling
export const WeatherErrorType = {
  API_KEY_MISSING: 'API_KEY_MISSING',
  CITY_NOT_FOUND: 'CITY_NOT_FOUND',
  NETWORK_ERROR: 'NETWORK_ERROR',
  RATE_LIMIT: 'RATE_LIMIT',
  INVALID_INPUT: 'INVALID_INPUT',
  UNKNOWN: 'UNKNOWN',
} as const;

export type WeatherErrorTypeValue = typeof WeatherErrorType[keyof typeof WeatherErrorType];

export class WeatherServiceError extends Error {
  type: WeatherErrorTypeValue;
  retryable: boolean;
  statusCode?: number;

  constructor(
    message: string,
    type: WeatherErrorTypeValue,
    retryable: boolean = false,
    statusCode?: number
  ) {
    super(message);
    this.name = 'WeatherServiceError';
    this.type = type;
    this.retryable = retryable;
    this.statusCode = statusCode;
  }
}

// 5-Day forecast data
export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: CityInfo;
}

export interface ForecastItem {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: CloudData;
  wind: WindData;
  visibility: number;
  pop: number; // Probability of precipitation
  dt_txt: string;
}

export interface CityInfo {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

// Weather alerts
export interface WeatherAlert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

// Extended weather data with alerts
export interface WeatherDataWithAlerts extends WeatherData {
  alerts?: WeatherAlert[];
}
