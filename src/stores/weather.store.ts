import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WeatherData } from "@/types/weather";

interface WeatherState {
    data: WeatherData | null;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    data: null,
    loading: false,
    error: null,
};

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setWeatherData(state, action: PayloadAction<WeatherData | null>) {
            state.data = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { setWeatherData, setLoading, setError } = weatherSlice.actions;
export default weatherSlice.reducer;
