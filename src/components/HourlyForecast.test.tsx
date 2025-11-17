import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HourlyForecast from './HourlyForecast';
import type { ForecastData } from '../types/weather';

// Mock the WeatherService
vi.mock('../services/weatherService', () => ({
  WeatherService: {
    getWeatherIconUrl: (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`,
  },
}));

describe('HourlyForecast', () => {
  const mockForecastData: ForecastData = {
    cod: '200',
    message: 0,
    cnt: 8,
    list: [
      {
        dt: 1700395200,
        main: {
          temp: 15,
          feels_like: 14,
          temp_min: 13,
          temp_max: 17,
          pressure: 1013,
          humidity: 70,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        clouds: { all: 0 },
        wind: { speed: 3.5, deg: 180 },
        visibility: 10000,
        pop: 0,
        dt_txt: '2023-11-19 12:00:00',
      },
      {
        dt: 1700406000,
        main: {
          temp: 16,
          feels_like: 15,
          temp_min: 14,
          temp_max: 18,
          pressure: 1015,
          humidity: 65,
        },
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d',
          },
        ],
        clouds: { all: 20 },
        wind: { speed: 4.0, deg: 200 },
        visibility: 10000,
        pop: 0.1,
        dt_txt: '2023-11-19 15:00:00',
      },
    ],
    city: {
      id: 2643743,
      name: 'London',
      coord: { lat: 51.5085, lon: -0.1257 },
      country: 'GB',
      population: 1000000,
      timezone: 0,
      sunrise: 1700382000,
      sunset: 1700413200,
    },
  };

  it('renders hourly forecast title', () => {
    render(<HourlyForecast forecast={mockForecastData} />);
    expect(screen.getByText(/Hourly Forecast|24-Hour Forecast/i)).toBeInTheDocument();
  });

  it('renders forecast items', () => {
    render(<HourlyForecast forecast={mockForecastData} />);
    const forecastItems = screen.getAllByRole('img');
    expect(forecastItems.length).toBeGreaterThan(0);
  });

  it('displays temperature in Celsius by default', () => {
    render(<HourlyForecast forecast={mockForecastData} />);
    // Look for any temperature in Celsius format
    expect(document.body.textContent).toMatch(/\d+°C/);
  });

  it('displays temperature in Fahrenheit when specified', () => {
    render(<HourlyForecast forecast={mockForecastData} tempUnit="F" />);
    // Look for any temperature in Fahrenheit format
    expect(document.body.textContent).toMatch(/\d+°F/);
  });
});
