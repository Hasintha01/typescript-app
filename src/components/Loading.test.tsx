import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
  it('renders loading message', () => {
    render(<Loading />);
    
    expect(screen.getByText('Loading weather data...')).toBeInTheDocument();
  });

  it('renders spinner element', () => {
    const { container } = render(<Loading />);
    
    expect(container.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Loading />);
    
    const container = screen.getByRole('status');
    expect(container).toHaveAttribute('aria-live', 'polite');
    expect(container).toHaveAttribute('aria-busy', 'true');
  });

  it('includes screen reader only text', () => {
    render(<Loading />);
    
    expect(screen.getByText('Loading weather information, please wait...')).toBeInTheDocument();
  });

  it('spinner has aria-hidden attribute', () => {
    const { container } = render(<Loading />);
    const spinner = container.querySelector('.loading-spinner');
    
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Loading />);
    
    expect(container.querySelector('.loading-container')).toBeInTheDocument();
    expect(container.querySelector('.loading-spinner')).toBeInTheDocument();
  });
});
