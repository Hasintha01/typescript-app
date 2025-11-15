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
