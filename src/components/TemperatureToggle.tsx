/**
 * TemperatureToggle Component
 * Toggle between Celsius and Fahrenheit
 */

import './TemperatureToggle.css';

interface TemperatureToggleProps {
  unit: 'C' | 'F';
  onToggle: (unit: 'C' | 'F') => void;
}

const TemperatureToggle = ({ unit, onToggle }: TemperatureToggleProps) => {
  return (
    <div className="temperature-toggle">
      <button
        className={`toggle-button ${unit === 'C' ? 'active' : ''}`}
        onClick={() => onToggle('C')}
        aria-label="Switch to Celsius"
      >
        °C
      </button>
      <button
        className={`toggle-button ${unit === 'F' ? 'active' : ''}`}
        onClick={() => onToggle('F')}
        aria-label="Switch to Fahrenheit"
      >
        °F
      </button>
    </div>
  );
};

export default TemperatureToggle;
