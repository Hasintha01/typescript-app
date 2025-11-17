import { describe, it, expect } from 'vitest';
import {
  formatTimestamp,
  celsiusToFahrenheit,
  formatTemperature,
  capitalizeWords,
  msToKmh,
  getWindDirection,
  isSevereWeather,
  getWeatherSeverity,
} from './helpers';

describe('formatTimestamp', () => {
  it('converts Unix timestamp to readable time', () => {
    const timestamp = 1700000000; // Wed Nov 15 2023 00:13:20 GMT
    const result = formatTimestamp(timestamp);
    expect(result).toMatch(/\d{2}:\d{2}\s(AM|PM)/);
  });
});

describe('celsiusToFahrenheit', () => {
  it('converts 0°C to 32°F', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
  });

  it('converts 100°C to 212°F', () => {
    expect(celsiusToFahrenheit(100)).toBe(212);
  });

  it('converts -40°C to -40°F', () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40);
  });

  it('converts 25°C to 77°F', () => {
    expect(celsiusToFahrenheit(25)).toBe(77);
  });
});

describe('formatTemperature', () => {
  it('formats temperature in Celsius by default', () => {
    expect(formatTemperature(25)).toBe('25°C');
  });

  it('formats temperature in Fahrenheit when specified', () => {
    expect(formatTemperature(25, 'F')).toBe('77°F');
  });

  it('rounds temperature to nearest integer', () => {
    expect(formatTemperature(25.6, 'C')).toBe('26°C');
    expect(formatTemperature(25.4, 'C')).toBe('25°C');
  });
});

describe('capitalizeWords', () => {
  it('capitalizes first letter of each word', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  it('handles single word', () => {
    expect(capitalizeWords('hello')).toBe('Hello');
  });

  it('handles multiple spaces', () => {
    expect(capitalizeWords('clear  sky')).toBe('Clear  Sky');
  });

  it('handles already capitalized words', () => {
    expect(capitalizeWords('Hello World')).toBe('Hello World');
  });
});

describe('msToKmh', () => {
  it('converts m/s to km/h', () => {
    expect(msToKmh(10)).toBe(36);
  });

  it('rounds to nearest integer', () => {
    expect(msToKmh(5.5)).toBe(20);
  });

  it('handles zero', () => {
    expect(msToKmh(0)).toBe(0);
  });
});

describe('getWindDirection', () => {
  it('returns N for 0 degrees', () => {
    expect(getWindDirection(0)).toBe('N');
  });

  it('returns E for 90 degrees', () => {
    expect(getWindDirection(90)).toBe('E');
  });

  it('returns S for 180 degrees', () => {
    expect(getWindDirection(180)).toBe('S');
  });

  it('returns W for 270 degrees', () => {
    expect(getWindDirection(270)).toBe('W');
  });

  it('returns NE for 45 degrees', () => {
    expect(getWindDirection(45)).toBe('NE');
  });

  it('returns SW for 225 degrees', () => {
    expect(getWindDirection(225)).toBe('SW');
  });
});

describe('isSevereWeather', () => {
  it('returns true for thunderstorm (200-299)', () => {
    expect(isSevereWeather(200)).toBe(true);
    expect(isSevereWeather(250)).toBe(true);
  });

  it('returns true for heavy rain (502-504)', () => {
    expect(isSevereWeather(502)).toBe(true);
    expect(isSevereWeather(503)).toBe(true);
  });

  it('returns true for freezing rain (511)', () => {
    expect(isSevereWeather(511)).toBe(true);
  });

  it('returns true for tornado (781)', () => {
    expect(isSevereWeather(781)).toBe(true);
  });

  it('returns false for clear sky (800)', () => {
    expect(isSevereWeather(800)).toBe(false);
  });

  it('returns false for light rain (500)', () => {
    expect(isSevereWeather(500)).toBe(false);
  });
});

describe('getWeatherSeverity', () => {
  it('returns severe for thunderstorm', () => {
    const result = getWeatherSeverity(200, 5, 10000);
    expect(result.level).toBe('severe');
    expect(result.message).toBe('Thunderstorm Alert');
  });

  it('returns severe for tornado', () => {
    const result = getWeatherSeverity(781, 20, 10000);
    expect(result.level).toBe('severe');
    expect(result.message).toBe('Tornado Warning');
  });

  it('returns warning for high winds', () => {
    const result = getWeatherSeverity(800, 15, 10000);
    expect(result.level).toBe('warning');
    expect(result.message).toBe('High Wind Warning');
  });

  it('returns caution for low visibility', () => {
    const result = getWeatherSeverity(800, 5, 500);
    expect(result.level).toBe('caution');
    expect(result.message).toBe('Low Visibility');
  });

  it('returns caution for moderate rain', () => {
    const result = getWeatherSeverity(500, 5, 10000);
    expect(result.level).toBe('caution');
    expect(result.message).toBe('Precipitation Alert');
  });

  it('returns normal for clear conditions', () => {
    const result = getWeatherSeverity(800, 5, 10000);
    expect(result.level).toBe('normal');
    expect(result.message).toBe('');
  });
});
