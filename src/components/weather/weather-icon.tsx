import {
  CloudRain,
  Sun,
  Cloud,
  CloudLightning,
  CloudSnow,
  CloudDrizzle,
  CloudFog,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const WeatherIcon = ({
  status,
  className,
  size = 24,
}: {
  status: string;
  className?: string;
  size?: number;
}) => {
  const iconProps = { size, strokeWidth: 1.5 };

  switch (status) {
    case "sun":
      return (
        <Sun
          {...iconProps}
          className={cn("text-amber-400 fill-amber-400/20", className)}
        />
      );
    case "cloud":
      return (
        <Cloud
          {...iconProps}
          className={cn("text-gray-400 fill-gray-400/20", className)}
        />
      );
    case "cloud-rain":
      return (
        <CloudRain
          {...iconProps}
          className={cn("text-blue-500 fill-blue-500/20", className)}
        />
      );
    case "cloud-drizzle":
      return (
        <CloudDrizzle
          {...iconProps}
          className={cn("text-blue-400 fill-blue-400/20", className)}
        />
      );
    case "cloud-lightning":
      return (
        <CloudLightning
          {...iconProps}
          className={cn("text-purple-500 fill-purple-500/20", className)}
        />
      );
    case "snowflake":
      return (
        <CloudSnow
          {...iconProps}
          className={cn("text-cyan-300 fill-cyan-300/20", className)}
        />
      );
    case "cloud-fog":
      return (
        <CloudFog
          {...iconProps}
          className={cn("text-slate-400 fill-slate-400/20", className)}
        />
      );
    default:
      return <Sun {...iconProps} className={cn("text-amber-400", className)} />;
  }
};
