import { motion } from "framer-motion";
import { MapPin, Wind, Droplets, Gauge, Eye } from "lucide-react";
import WeatherIcon from "./WeatherIcon";

// Weather Detail Component
const WeatherDetail = ({ icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-background/20 rounded-2xl p-4 text-center"
  >
    <div className="flex items-center justify-center text-primary mb-2">
      {icon}
    </div>
    <p className="text-text-secondary text-xs mb-1">{label}</p>
    <p className="text-text-primary font-semibold text-sm">{value}</p>
  </motion.div>
);

export default function WeatherCard({ weather, isDark }) {
  const getWeatherColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case "clear":
        return isDark ? "#FFD54F" : "#FFD54F";
      case "rain":
      case "drizzle":
        return isDark ? "#90CAF9" : "#4FC3F7";
      case "thunderstorm":
        return "#EF5350";
      case "snow":
        return "#E3F2FD";
      default:
        return isDark ? "#90CAF9" : "#4FC3F7";
    }
  };

  const weatherColor = getWeatherColor(weather.weather[0].main);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-card backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/10 max-w-md w-full"
    >
      {/* Main Weather Info */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-6"
      >
        <div className="flex items-center justify-center space-x-2 mb-2">
          <MapPin size={16} className="text-text-secondary" />
          <h2 className="text-xl font-bold text-text-primary">
            {weather.name}, {weather.sys.country}
          </h2>
        </div>
        
        <motion.div
          style={{ color: weatherColor }}
          className="flex items-center justify-center space-x-3 mb-3"
        >
          <WeatherIcon condition={weather.weather[0].main} size={48} />
          <span className="text-5xl font-light">
            {Math.round(weather.main.temp)}°
          </span>
        </motion.div>
        
        <p className="text-text-secondary capitalize text-lg">
          {weather.weather[0].description}
        </p>
        <p className="text-text-secondary text-sm">
          Feels like {Math.round(weather.main.feels_like)}°C
        </p>
      </motion.div>

      {/* Weather Details Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-2 gap-4"
      >
        <WeatherDetail
          icon={<Wind size={18} />}
          label="Wind"
          value={`${weather.wind.speed} m/s`}
        />
        <WeatherDetail
          icon={<Droplets size={18} />}
          label="Humidity"
          value={`${weather.main.humidity}%`}
        />
        <WeatherDetail
          icon={<Gauge size={18} />}
          label="Pressure"
          value={`${weather.main.pressure} hPa`}
        />
        <WeatherDetail
          icon={<Eye size={18} />}
          label="Visibility"
          value={`${(weather.visibility / 1000).toFixed(1)} km`}
        />
      </motion.div>
    </motion.div>
  );
}