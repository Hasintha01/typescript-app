import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ForecastCard from './ForecastCard';
import type { ForecastData } from '../types/weather';

// Mock the WeatherService
vi.mock('../services/weatherService', () => ({
  WeatherService: {
    getWeatherIconUrl: (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`,
  },
}));

describe('ForecastCard', () => {
  const mockForecastData: ForecastData = {
    cod: '200',
    message: 0,
    cnt: 40,
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
          sea_level: 1013,
          grnd_level: 1011,
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
        dt: 1700481600,
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
        dt_txt: '2023-11-20 12:00:00',
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

  it('renders forecast title', () => {
    render(<ForecastCard forecast={mockForecastData} />);
    expect(screen.getByText('5-Day Forecast')).toBeInTheDocument();
  });

  it('renders forecast items', () => {
    render(<ForecastCard forecast={mockForecastData} />);
    const forecastItems = screen.getAllByText(/Clear Sky|Few Clouds/i);
    expect(forecastItems.length).toBeGreaterThan(0);
  });

  it('displays temperature in Celsius by default', () => {
    render(<ForecastCard forecast={mockForecastData} />);
    expect(screen.getByText('15°C')).toBeInTheDocument();
  });

  it('displays temperature in Fahrenheit when specified', () => {
    render(<ForecastCard forecast={mockForecastData} tempUnit="F" />);
    expect(screen.getByText('59°F')).toBeInTheDocument();
  });

  it('displays weather icons', () => {
    render(<ForecastCard forecast={mockForecastData} />);
    const icons = screen.getAllByRole('img');
    expect(icons.length).toBeGreaterThan(0);
  });
});
