import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";

export default function SearchBar({ city, setCity, onSearch, loading, isDark }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-md"
    >
      <input
        type="text"
        placeholder="Search for a city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-full px-6 py-4 pr-14 rounded-2xl bg-card border border-white/10 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSearch}
        disabled={loading}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl bg-primary text-white hover:bg-secondary transition-colors duration-300 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <Search size={20} />
        )}
      </motion.button>
    </motion.div>
  );
}