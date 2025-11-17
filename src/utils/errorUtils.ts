/**
 * Error Utility Functions
 * Helper functions for handling and displaying errors
 */

import { WeatherServiceError, WeatherErrorType } from '../types/weather';

/**
 * Get a user-friendly error message from an error object
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof WeatherServiceError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
}

/**
 * Check if an error is retryable
 */
export function isRetryableError(error: unknown): boolean {
  if (error instanceof WeatherServiceError) {
    return error.retryable;
  }
  return false;
}

/**
 * Get error type from error object
 */
export function getErrorType(error: unknown): string {
  if (error instanceof WeatherServiceError) {
    return error.type;
  }
  return WeatherErrorType.UNKNOWN;
}

/**
 * Check if error is a specific type
 */
export function isErrorType(error: unknown, type: string): boolean {
  if (error instanceof WeatherServiceError) {
    return error.type === type;
  }
  return false;
}
