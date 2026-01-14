import { format } from "date-fns";
import { useState } from "react";
import { type Event } from "@/lib/calendar-utils";

export function useCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Họp team dự án",
      time: "09:00",
      date: new Date(),
    },
  ]);

  const handleAddEvent = (title: string, time: string) => {
    if (!date || !title) return;

    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: title,
      time: time,
      date: date,
    };

    setEvents([...events, newEvent]);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const selectedDateEvents = events.filter(
    (e) => date && format(e.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

  return {
    date,
    events,
    selectedDateEvents,
    handleAddEvent,
    handleDeleteEvent,
    setDate,
  };
}
