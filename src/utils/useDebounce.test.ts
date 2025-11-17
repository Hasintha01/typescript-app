/**
 * Tests for useDebounce Hook
 */

import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 300));
    expect(result.current).toBe('test');
  });

  it('debounces value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );

    expect(result.current).toBe('initial');

    // Update the value
    rerender({ value: 'updated', delay: 300 });

    // Value should not change immediately
    expect(result.current).toBe('initial');

    // Wait for debounce delay
    await waitFor(
      () => {
        expect(result.current).toBe('updated');
      },
      { timeout: 400 }
    );
  });

  it('cancels previous timeout on rapid changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 300 } }
    );

    // Rapid changes
    rerender({ value: 'second', delay: 300 });
    rerender({ value: 'third', delay: 300 });
    rerender({ value: 'fourth', delay: 300 });

    // Should only update to the last value after delay
    await waitFor(
      () => {
        expect(result.current).toBe('fourth');
      },
      { timeout: 400 }
    );
  });

  it('works with different data types', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 0, delay: 200 } }
    );

    expect(result.current).toBe(0);

    rerender({ value: 42, delay: 200 });

    await waitFor(
      () => {
        expect(result.current).toBe(42);
      },
      { timeout: 300 }
    );
  });

  it('respects custom delay values', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'test', delay: 100 } }
    );

    rerender({ value: 'updated', delay: 100 });

    // Should update faster with shorter delay
    await waitFor(
      () => {
        expect(result.current).toBe('updated');
      },
      { timeout: 200 }
    );
  });
});
