/**
 * Tests for Error Utilities
 */

import { describe, it, expect } from 'vitest';
import { WeatherServiceError, WeatherErrorType } from '../types/weather';
import { 
  getErrorMessage, 
  isRetryableError, 
  getErrorType,
  isErrorType 
} from './errorUtils';

describe('errorUtils', () => {
  describe('getErrorMessage', () => {
    it('returns message from WeatherServiceError', () => {
      const error = new WeatherServiceError(
        'City not found',
        WeatherErrorType.CITY_NOT_FOUND,
        false
      );
      expect(getErrorMessage(error)).toBe('City not found');
    });

    it('returns message from standard Error', () => {
      const error = new Error('Standard error message');
      expect(getErrorMessage(error)).toBe('Standard error message');
    });

    it('returns default message for unknown errors', () => {
      expect(getErrorMessage('string error')).toBe('An unexpected error occurred. Please try again.');
      expect(getErrorMessage(null)).toBe('An unexpected error occurred. Please try again.');
      expect(getErrorMessage(undefined)).toBe('An unexpected error occurred. Please try again.');
    });
  });

  describe('isRetryableError', () => {
    it('returns true for retryable WeatherServiceError', () => {
      const error = new WeatherServiceError(
        'Network error',
        WeatherErrorType.NETWORK_ERROR,
        true
      );
      expect(isRetryableError(error)).toBe(true);
    });

    it('returns false for non-retryable WeatherServiceError', () => {
      const error = new WeatherServiceError(
        'City not found',
        WeatherErrorType.CITY_NOT_FOUND,
        false
      );
      expect(isRetryableError(error)).toBe(false);
    });

    it('returns false for non-WeatherServiceError', () => {
      expect(isRetryableError(new Error('Standard error'))).toBe(false);
      expect(isRetryableError('string error')).toBe(false);
    });
  });

  describe('getErrorType', () => {
    it('returns correct error type for WeatherServiceError', () => {
      const error = new WeatherServiceError(
        'City not found',
        WeatherErrorType.CITY_NOT_FOUND,
        false
      );
      expect(getErrorType(error)).toBe(WeatherErrorType.CITY_NOT_FOUND);
    });

    it('returns UNKNOWN for non-WeatherServiceError', () => {
      expect(getErrorType(new Error('Standard error'))).toBe(WeatherErrorType.UNKNOWN);
      expect(getErrorType('string error')).toBe(WeatherErrorType.UNKNOWN);
    });
  });

  describe('isErrorType', () => {
    it('returns true when error type matches', () => {
      const error = new WeatherServiceError(
        'City not found',
        WeatherErrorType.CITY_NOT_FOUND,
        false
      );
      expect(isErrorType(error, WeatherErrorType.CITY_NOT_FOUND)).toBe(true);
    });

    it('returns false when error type does not match', () => {
      const error = new WeatherServiceError(
        'City not found',
        WeatherErrorType.CITY_NOT_FOUND,
        false
      );
      expect(isErrorType(error, WeatherErrorType.NETWORK_ERROR)).toBe(false);
    });

    it('returns false for non-WeatherServiceError', () => {
      expect(isErrorType(new Error('Standard error'), WeatherErrorType.CITY_NOT_FOUND)).toBe(false);
      expect(isErrorType('string error', WeatherErrorType.NETWORK_ERROR)).toBe(false);
    });
  });
});
