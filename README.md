# Weather Dashboard

A weather dashboard application built with React, TypeScript, and Vite. Search for any city to get real-time weather information using the OpenWeatherMap API.

## Features

- Search weather by city name
- Display current temperature and weather conditions
- Show detailed weather information (humidity, wind speed, pressure, etc.)
- Responsive design for mobile and desktop
- Real-time data from OpenWeatherMap API

## Tech Stack

- React 18
- TypeScript
- Vite
- OpenWeatherMap API
- CSS3

## Project Structure

```
typescript-app/
├── src/
│   ├── components/       # UI components
│   │   ├── SearchBar.tsx
│   │   ├── WeatherCard.tsx
│   │   ├── Loading.tsx
│   │   └── ErrorMessage.tsx
│   ├── services/         # API integration
│   │   └── weatherService.ts
│   ├── types/            # TypeScript definitions
│   │   └── weather.ts
│   ├── utils/            # Helper functions
│   │   └── helpers.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── .env.example
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenWeatherMap API key

### Installation

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
```bash
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Get your free API key:
   - Visit https://openweathermap.org/api
   - Sign up for a free account
   - Copy your API key from https://home.openweathermap.org/api_keys
   - Note: New API keys take 10-15 minutes to activate

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:5173 in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Information

This project uses the OpenWeatherMap API. The free tier includes:
- 60 calls per minute
- 1,000,000 calls per month
- Current weather data

## Development Status

- Phase 1: Project setup - Complete
- Phase 2: Core functionality and UI components - Complete

## License

MIT

## Author

Hasintha01
