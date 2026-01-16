import axiosInstance from "./api.service";
import { VITE_CALENDAR_KEY } from "../constant/base";
import type { HolidayResponse } from "@/types/calendar";

const BASE_URL = "https://calendarific.com/api/v2/holidays";

export const getHoliday = async (
  countryCode: string,
  year: number
): Promise<HolidayResponse> => {
  const response = await axiosInstance.get(
    `${BASE_URL}?api_key=${VITE_CALENDAR_KEY}&country=${countryCode}&year=${year}`
  );
  return response.data;
};
