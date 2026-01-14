import { fetchWeatherData, type WeatherData } from "@/services/weather.service";
import { useState } from "react";
import { useEffect } from "react";
export const useWeather = () => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadWeather = async () => {
            try {
                setLoading(true);
                const result = await fetchWeatherData();
                setData(result);
            } catch (err) {
                setError("Không thể tải dữ liệu thời tiết");
            } finally {
                setLoading(false);
            }
        };
        loadWeather();
    }, []);
    return {
        data,
        loading,
        error
    }
}