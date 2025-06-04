import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning 
} from "lucide-react";

export default function WeatherIcon({ condition, size = 24 }) {
  const iconProps = { size, className: "text-current" };
  
  switch (condition?.toLowerCase()) {
    case "clear":
      return <Sun {...iconProps} />;
    case "clouds":
      return <Cloud {...iconProps} />;
    case "rain":
    case "drizzle":
      return <CloudRain {...iconProps} />;
    case "snow":
      return <CloudSnow {...iconProps} />;
    case "thunderstorm":
      return <CloudLightning {...iconProps} />;
    default:
      return <Sun {...iconProps} />;
  }
}