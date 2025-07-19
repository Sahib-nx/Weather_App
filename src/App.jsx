import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios"; // Added axios import
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import LoadingAnimation from "./components/LoadingAnimation";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(true);

  // Apply theme classes
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--bg-primary', '#121212');
      root.style.setProperty('--bg-card', '#1F1F1F');
      root.style.setProperty('--text-primary', '#E0E0E0');
      root.style.setProperty('--text-secondary', '#A0A0A0');
      root.style.setProperty('--primary', '#90CAF9');
      root.style.setProperty('--secondary', '#0288D1');
      root.style.setProperty('--accent', '#FFD54F');
    } else {
      root.style.setProperty('--bg-primary', '#F5F9FF');
      root.style.setProperty('--bg-card', '#FFFFFF');
      root.style.setProperty('--text-primary', '#2E2E2E');
      root.style.setProperty('--text-secondary', '#6D7D8B');
      root.style.setProperty('--primary', '#4FC3F7');
      root.style.setProperty('--secondary', '#0288D1');
      root.style.setProperty('--accent', '#FFD54F');
    }
  }, [isDark]);

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.log(error)
      setError("City not found. Please check the spelling and try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen transition-all duration-500 ease-in-out"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #121212 0%, #1F1F1F 50%, #2C3E50 100%)'
          : 'linear-gradient(135deg, #F5F9FF 0%, #E3F2FD 50%, #BBDEFB 100%)'
      }}
    >
      <style jsx>{`
        .bg-background { background-color: var(--bg-primary); }
        .bg-card { background-color: var(--bg-card); }
        .text-text-primary { color: var(--text-primary); }
        .text-text-secondary { color: var(--text-secondary); }
        .text-primary { color: var(--primary); }
        .bg-primary { background-color: var(--primary); }
        .hover\\:bg-secondary:hover { background-color: var(--secondary); }
        .focus\\:ring-primary:focus { --tw-ring-color: var(--primary); }
      `}</style>

      <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
      
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary">
            Weather<span className="text-primary">Cast</span>
          </h1>
          <p className="text-text-secondary text-lg">
            Get real-time weather updates for any city
          </p>
        </motion.div>

        {/* Search Bar */}
        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={getWeather}
          loading={loading}
          isDark={isDark}
        />

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-3 rounded-2xl text-center max-w-md"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Animation */}
        <AnimatePresence>
          {loading && <LoadingAnimation />}
        </AnimatePresence>

        {/* Weather Card */}
        <AnimatePresence>
          {weather && !loading && (
            <WeatherCard weather={weather} isDark={isDark} />
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-text-secondary text-sm mt-8"
        >
          <p>Built with React, Framer Motion & Lucide Icons</p>
        </motion.div>
      </div>
    </div>
  );
}