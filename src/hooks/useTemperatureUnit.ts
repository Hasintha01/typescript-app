/**
 * useTemperatureUnit Hook
 * Manages temperature unit preference with localStorage persistence
 */

import { useState } from 'react';

export type TemperatureUnit = 'C' | 'F';

export const useTemperatureUnit = () => {
  // Get saved temperature unit from localStorage or default to Celsius
  const getSavedTempUnit = (): TemperatureUnit => {
    const saved = localStorage.getItem('tempUnit');
    return saved === 'F' || saved === 'C' ? saved : 'C';
  };

  const [tempUnit, setTempUnit] = useState<TemperatureUnit>(getSavedTempUnit());

  // Handle temperature unit toggle
  const toggleTempUnit = (unit: TemperatureUnit) => {
    setTempUnit(unit);
    localStorage.setItem('tempUnit', unit);
  };

  return {
    tempUnit,
    toggleTempUnit,
  };
};
