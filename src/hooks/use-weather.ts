import { fetchWeatherData } from "@/services/weather.service";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/stores/root.store";
import { setWeatherData, setLoading, setError } from "@/stores/weather.store";

export const useWeather = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state: RootState) => state.weather);
    const currentWeather = data?.current.temp;
    useEffect(() => {
        if (data) return;

        const loadWeather = async () => {
            try {
                dispatch(setLoading(true));
                const result = await fetchWeatherData();
                dispatch(setWeatherData(result));
            } catch (err) {
                dispatch(setError("Không thể tải dữ liệu thời tiết"));
            } finally {
                dispatch(setLoading(false));
            }
        };
        loadWeather();
    }, [dispatch, data]);

    return {
        currentWeather,
        data,
        loading,
        error
    }
}