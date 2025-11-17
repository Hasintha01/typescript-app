import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders error message', () => {
    render(<ErrorMessage message="Network error occurred" />);
    
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Network error occurred')).toBeInTheDocument();
  });

  it('displays error icon', () => {
    render(<ErrorMessage message="Test error" />);
    
    const errorIcon = document.querySelector('.error-icon');
    expect(errorIcon).toBeInTheDocument();
    expect(errorIcon?.tagName.toLowerCase()).toBe('svg');
  });

  it('renders retry button when onRetry is provided', () => {
    const mockOnRetry = vi.fn();
    render(<ErrorMessage message="Test error" onRetry={mockOnRetry} />);
    
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('does not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Test error" />);
    
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnRetry = vi.fn();
    render(<ErrorMessage message="Test error" onRetry={mockOnRetry} />);
    
    const retryButton = screen.getByText('Try Again');
    await user.click(retryButton);
    
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<ErrorMessage message="Test error" />);
    
    expect(container.querySelector('.error-container')).toBeInTheDocument();
    expect(container.querySelector('.error-icon')).toBeInTheDocument();
    expect(container.querySelector('.error-message')).toBeInTheDocument();
  });
});
