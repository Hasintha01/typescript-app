import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TemperatureToggle from './TemperatureToggle';

describe('TemperatureToggle', () => {
  it('renders both Celsius and Fahrenheit buttons', () => {
    const mockOnToggle = vi.fn();
    render(<TemperatureToggle unit="C" onToggle={mockOnToggle} />);
    
    expect(screen.getByLabelText('Switch to Celsius')).toBeInTheDocument();
    expect(screen.getByLabelText('Switch to Fahrenheit')).toBeInTheDocument();
  });

  it('highlights Celsius button when unit is C', () => {
    const mockOnToggle = vi.fn();
    render(<TemperatureToggle unit="C" onToggle={mockOnToggle} />);
    
    const celsiusButton = screen.getByLabelText('Switch to Celsius');
    expect(celsiusButton).toHaveClass('active');
  });

  it('highlights Fahrenheit button when unit is F', () => {
    const mockOnToggle = vi.fn();
    render(<TemperatureToggle unit="F" onToggle={mockOnToggle} />);
    
    const fahrenheitButton = screen.getByLabelText('Switch to Fahrenheit');
    expect(fahrenheitButton).toHaveClass('active');
  });

  it('calls onToggle with C when Celsius button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();
    render(<TemperatureToggle unit="F" onToggle={mockOnToggle} />);
    
    const celsiusButton = screen.getByLabelText('Switch to Celsius');
    await user.click(celsiusButton);
    
    expect(mockOnToggle).toHaveBeenCalledWith('C');
  });

  it('calls onToggle with F when Fahrenheit button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();
    render(<TemperatureToggle unit="C" onToggle={mockOnToggle} />);
    
    const fahrenheitButton = screen.getByLabelText('Switch to Fahrenheit');
    await user.click(fahrenheitButton);
    
    expect(mockOnToggle).toHaveBeenCalledWith('F');
  });
});
