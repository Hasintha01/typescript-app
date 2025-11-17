# Weather Dashboard

A modern, feature-rich weather dashboard built with React, TypeScript, and Vite. Get comprehensive weather information including current conditions, hourly updates, and 5-day forecasts using the OpenWeatherMap API.

## Features

### Core Functionality
- **City Search**: Search weather data for any city worldwide
- **Location Detection**: Automatic weather for your current location
- **Weather Forecasts**: 5-day forecast with detailed daily breakdowns
- **Hourly Updates**: Hour-by-hour weather predictions

### User Experience
- **Temperature Toggle**: Switch between Celsius and Fahrenheit
- **Theme Switcher**: Dark and light mode support
- **Weather Alerts**: Real-time weather warnings and notifications
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Loading States**: Smooth transitions and feedback
- **Error Handling**: Clear error messages and recovery options

## Tech Stack

- **React 18**: Component-based UI library
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **OpenWeatherMap API**: Real-time weather data
- **CSS3**: Modern styling with custom properties and animations

## Project Structure

```
typescript-app/
├── src/
│   ├── components/
│   │   ├── SearchBar.tsx
│   │   ├── WeatherCard.tsx
│   │   ├── ForecastCard.tsx
│   │   ├── HourlyForecast.tsx
│   │   ├── CurrentLocationButton.tsx
│   │   ├── TemperatureToggle.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── WeatherAlert.tsx
│   │   ├── Loading.tsx
│   │   └── ErrorMessage.tsx
│   ├── services/
│   │   └── weatherService.ts
│   ├── types/
│   │   └── weather.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
└── package.json
```

## Setup

### Prerequisites

- Node.js v18 or higher
- npm or yarn package manager
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Hasintha01/typescript-app.git
cd typescript-app
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment variables**:

Create a `.env` file in the root directory:
```bash
VITE_WEATHER_API_KEY=your_api_key_here
```

4. **Get your API key**:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Navigate to API keys section
   - Copy your key (activation takes ~10 minutes)

5. **Start development server**:
```bash
npm run dev
```

6. **Access the application**:

Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Project Highlights

- **Type Safety**: Full TypeScript implementation for reduced runtime errors
- **Component Architecture**: Modular, reusable components with clear separation of concerns
- **API Integration**: Centralized service layer for weather data management
- **Modern Styling**: CSS custom properties for consistent theming
- **Performance**: Optimized with Vite for fast development and production builds

## License

MIT

## Author

Hasintha01
