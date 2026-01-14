import { useState, useMemo } from "react";
import { format, isValid, subDays } from "date-fns";

interface UseDateProps {
    currentDate: string;
    onDateChange?: (newDate: string) => void;
}

export function useDate({ currentDate, onDateChange }: UseDateProps) {
    const [isOpen, setIsOpen] = useState(false);

    const date = useMemo(() => {
        if (!currentDate) return new Date();
        const parsedDate = new Date(currentDate);
        return isValid(parsedDate) ? parsedDate : new Date();
    }, [currentDate]);

    const handleSelectDate = (selectedDate: Date | undefined) => {
        if (selectedDate && onDateChange) {
            onDateChange(format(selectedDate, "yyyy-MM-dd"));
            setIsOpen(false);
        }
    };

    const formatDateSafe = (
        d: Date | string | number,
        dateFormat: string = "dd/MM/yyyy"
    ) => {
        try {
            const dateObj = new Date(d);
            return isValid(dateObj) ? format(dateObj, dateFormat) : "";
        } catch (e) {
            return "";
        }
    };

    const todayDate = useMemo(() => formatDateSafe(date), [date]);

    const yesterdayDate = useMemo(() => {
        const prevDate = subDays(date, 1);
        return formatDateSafe(prevDate);
    }, [date]);

    return {
        date,
        isOpen,
        setIsOpen,
        handleSelectDate,
        formatDateSafe,
        todayDate,
        yesterdayDate,
    };
}
