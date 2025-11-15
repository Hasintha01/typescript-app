# Weather Dashboard 🌤️

A modern weather dashboard built with React, TypeScript, and Vite. Get real-time weather information for any city around the world using the OpenWeatherMap API.

## 📋 Features

- 🔍 Search weather by city name
- 🌡️ Display current temperature, weather conditions, and more
- 🎨 Clean and responsive UI design
- ⚡ Fast performance with Vite
- 📱 Mobile-friendly interface
- 🐳 Docker support for containerization

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **API**: OpenWeatherMap API
- **Containerization**: Docker

## 📁 Project Structure

```
weather-dashboard/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Main application pages
│   ├── services/       # API integration services
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Helper functions
│   ├── styles/         # Global styles
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── Dockerfile          # Docker configuration (coming soon)
└── package.json        # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenWeatherMap API key ([Get it here](https://openweathermap.org/api))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐳 Docker (Coming Soon)

Instructions for running with Docker will be added in Phase 5.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ as a learning project

---

**Current Status**: Phase 1 Complete - Project Initialized ✅
])
```
