# Weather Dashboard

A modern, responsive weather dashboard built with React, TypeScript, and Vite. The application provides comprehensive real-time weather information including current conditions, hourly forecasts, and 5-day predictions powered by the OpenWeatherMap API.

## Features

### Weather Information

- **City Search**: Search for any city worldwide with intelligent error handling
- **Geolocation**: Automatically detect and display weather for your current location
- **Current Weather**: Real-time conditions including temperature, humidity, wind speed, and weather descriptions
- **5-Day Forecast**: Detailed daily forecasts with high/low temperatures and conditions
- **Hourly Forecast**: Hour-by-hour weather predictions for better planning
- **Weather Alerts**: Display severe weather warnings and notifications when available

### User Interface

- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Theme Switcher**: Dark and light mode with smooth transitions
- **Responsive Design**: Optimized layouts for desktop, tablet, and mobile devices
- **Loading States**: Skeleton loaders for better perceived performance
- **Error Handling**: User-friendly error messages with retry options
- **Accessibility**: Keyboard navigation and screen reader support

## Tech Stack

### Frontend

- **React 19**: Latest version with improved performance and features
- **TypeScript**: Full type safety throughout the application
- **Vite**: Fast build tool with HMR (Hot Module Replacement)
- **CSS3**: Modern styling with custom properties, animations, and responsive layouts

### Testing

- **Vitest**: Fast unit test runner with React Testing Library integration
- **@testing-library/react**: Component testing utilities
- **Coverage**: Code coverage reporting with v8

### Development Tools

- **ESLint**: Code linting with React and TypeScript rules
- **Prettier**: Code formatting with lint-staged integration
- **Husky**: Git hooks for pre-commit checks

### Deployment

- **Docker**: Multi-stage builds for optimized production images
- **Docker Compose**: Easy container orchestration for development and production
- **Nginx**: Production-ready web server for serving static files

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- OpenWeatherMap API key (free tier available at [openweathermap.org](https://openweathermap.org/api))

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Hasintha01/typescript-app.git
cd typescript-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Testing

- `npm test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate coverage report

### Code Quality

- `npm run lint` - Run ESLint

### Docker

- `npm run docker:up` - Start production container
- `npm run docker:up:dev` - Start development container
- `npm run docker:down` - Stop all containers

## Docker Deployment

### Using Docker Compose (recommended)

```bash
docker-compose up -d
```

### Manual Docker Build

```bash
docker build -t weather-dashboard .
docker run -d -p 8080:80 weather-dashboard
```

Access the application at `http://localhost:8080`

## Project Structure

```
src/
├── components/           # React components
│   ├── SearchBar.tsx            # City search with debouncing
│   ├── WeatherCard.tsx          # Current weather display
│   ├── ForecastCard.tsx         # 5-day forecast view
│   ├── HourlyForecast.tsx       # Hourly predictions
│   ├── CurrentLocationButton.tsx # Geolocation handler
│   ├── TemperatureToggle.tsx    # Unit switcher
│   ├── ThemeToggle.tsx          # Dark/light mode
│   ├── WeatherAlert.tsx         # Alert notifications
│   ├── ErrorMessage.tsx         # Error display
│   └── Loading.tsx              # Loading states
├── hooks/                # Custom React hooks
│   ├── useWeather.ts            # Weather data management
│   ├── useGeolocation.ts        # Location access
│   └── useTemperatureUnit.ts    # Temperature preferences
├── services/             # API service layer
│   └── weatherService.ts        # OpenWeatherMap API calls
├── types/                # TypeScript definitions
│   └── weather.ts               # Weather data types
├── utils/                # Helper functions
│   └── helpers.ts               # Utility functions
└── test/                 # Test configuration
    └── setup.ts                 # Vitest setup
```

## Architecture

### Component Design

- Functional components with React hooks
- Separation of concerns between UI and business logic
- Reusable component patterns with TypeScript generics
- CSS modules for component-scoped styling

### State Management

- Custom hooks for shared state logic
- Local storage for user preferences (theme, temperature unit)
- Efficient re-rendering with React memoization

### API Integration

- Centralized API service layer
- Error handling with retry logic
- Request debouncing for search functionality
- Type-safe API responses with TypeScript interfaces

## License

MIT

## Author

[Hasintha01](https://github.com/Hasintha01)
