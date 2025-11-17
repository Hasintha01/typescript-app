import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTemperatureUnit } from './useTemperatureUnit';

describe('useTemperatureUnit', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('defaults to Celsius when no saved preference', () => {
    const { result } = renderHook(() => useTemperatureUnit());
    expect(result.current.tempUnit).toBe('C');
  });

  it('loads saved preference from localStorage', () => {
    localStorage.setItem('tempUnit', 'F');
    const { result } = renderHook(() => useTemperatureUnit());
    expect(result.current.tempUnit).toBe('F');
  });

  it('toggles temperature unit', () => {
    const { result } = renderHook(() => useTemperatureUnit());

    act(() => {
      result.current.toggleTempUnit('F');
    });

    expect(result.current.tempUnit).toBe('F');
    expect(localStorage.getItem('tempUnit')).toBe('F');
  });

  it('persists unit changes to localStorage', () => {
    const { result } = renderHook(() => useTemperatureUnit());

    act(() => {
      result.current.toggleTempUnit('F');
    });

    expect(localStorage.getItem('tempUnit')).toBe('F');

    act(() => {
      result.current.toggleTempUnit('C');
    });

    expect(localStorage.getItem('tempUnit')).toBe('C');
  });
});
