import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';
import type { WeatherData } from '../types/weather';

// Mock the WeatherService
vi.mock('../services/weatherService', () => ({
  WeatherService: {
    getWeatherIconUrl: (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`,
  },
}));

describe('WeatherCard', () => {
  const mockWeatherData: WeatherData = {
    coord: { lon: -0.1257, lat: 51.5085 },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    base: 'stations',
    main: {
      temp: 20,
      feels_like: 18,
      temp_min: 18,
      temp_max: 22,
      pressure: 1013,
      humidity: 65,
    },
    visibility: 10000,
    wind: {
      speed: 5,
      deg: 180,
    },
    clouds: {
      all: 0,
    },
    dt: 1700000000,
    sys: {
      country: 'GB',
      sunrise: 1699942800,
      sunset: 1699976400,
    },
    timezone: 0,
    id: 2643743,
    name: 'London',
    cod: 200,
  };

  it('renders city name and country', () => {
    render(<WeatherCard weather={mockWeatherData} />);
    
    expect(screen.getByText('London, GB')).toBeInTheDocument();
  });

  it('renders weather description', () => {
    render(<WeatherCard weather={mockWeatherData} />);
    
    expect(screen.getByText('Clear Sky')).toBeInTheDocument();
  });

  it('renders temperature in Celsius by default', () => {
    render(<WeatherCard weather={mockWeatherData} />);
    
    expect(screen.getByText('20°C')).toBeInTheDocument();
  });

  it('renders temperature in Fahrenheit when specified', () => {
    render(<WeatherCard weather={mockWeatherData} tempUnit="F" />);
    
    expect(screen.getByText('68°F')).toBeInTheDocument();
  });

  it('displays weather icon', () => {
    render(<WeatherCard weather={mockWeatherData} />);
    
    const icon = screen.getByAltText('clear sky');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', 'https://openweathermap.org/img/wn/01d@2x.png');
  });

  it('displays humidity', () => {
    render(<WeatherCard weather={mockWeatherData} />);
    
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('displays pressure', () => {
    render(<WeatherCard weather={mockWeatherData} />);
    
    expect(screen.getByText('Pressure')).toBeInTheDocument();
    expect(screen.getByText('1013 hPa')).toBeInTheDocument();
  });

  it('displays wind speed', () => {
    render(<WeatherCard weather={mockWeatherData} />);
    
    expect(screen.getByText('Wind Speed')).toBeInTheDocument();
    expect(screen.getByText(/18 km\/h/)).toBeInTheDocument();
  });

  it('displays visibility', () => {
    render(<WeatherCard weather={mockWeatherData} />);
    
    expect(screen.getByText('Visibility')).toBeInTheDocument();
    expect(screen.getByText('10.0 km')).toBeInTheDocument();
  });

  it('displays feels like temperature', () => {
    render(<WeatherCard weather={mockWeatherData} />);
    
    expect(screen.getByText('Feels Like')).toBeInTheDocument();
    expect(screen.getByText('18°C')).toBeInTheDocument();
  });

  it('displays min and max temperatures', () => {
    render(<WeatherCard weather={mockWeatherData} />);
    
    expect(screen.getByText('Min / Max')).toBeInTheDocument();
    expect(screen.getByText('18°C / 22°C')).toBeInTheDocument();
  });

  it('shows weather alert for severe conditions', () => {
    const severeWeather: WeatherData = {
      ...mockWeatherData,
      weather: [
        {
          id: 200,
          main: 'Thunderstorm',
          description: 'thunderstorm with light rain',
          icon: '11d',
        },
      ],
    };

    render(<WeatherCard weather={severeWeather} />);
    
    expect(screen.getByText('Thunderstorm Alert')).toBeInTheDocument();
  });

  it('applies severe-weather class for severe conditions', () => {
    const severeWeather: WeatherData = {
      ...mockWeatherData,
      weather: [
        {
          id: 200,
          main: 'Thunderstorm',
          description: 'thunderstorm',
          icon: '11d',
        },
      ],
    };

    const { container } = render(<WeatherCard weather={severeWeather} />);
    
    expect(container.querySelector('.severe-weather')).toBeInTheDocument();
  });

  it('shows warning for high wind conditions', () => {
    const highWindWeather: WeatherData = {
      ...mockWeatherData,
      wind: {
        speed: 15,
        deg: 180,
      },
    };

    render(<WeatherCard weather={highWindWeather} />);
    
    expect(screen.getByText('High Wind Warning')).toBeInTheDocument();
  });
});
