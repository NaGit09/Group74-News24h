export interface WeatherData {
    current: {
        temp: number;
        status: string;
        description: string;
        humidity: number;
        windSpeed: number;
        uvIndex: number;
        weatherCode: number;
    };
    hourly: {
        time: string;
        temp: number;
        status: string;
        weatherCode: number;
    }[];
    weekly: {
        day: string;
        tempHigh: number;
        tempLow: number;
        status: string;
        weatherCode: number;
    }[];
}