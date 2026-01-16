export interface Event {
    id: string;
    title: string;
    time: string;
    date: Date;
}

export const getLunarMock = (date: Date) => {
    const mockLunar = new Date(date);
    mockLunar.setDate(date.getDate() - 29);

    const daySum = date.getDate() + date.getMonth();
    const isAuspicious = daySum % 3 === 0;
    const isInauspicious = daySum % 4 === 0 && !isAuspicious;

    return {
        day: mockLunar.getDate(),
        month: mockLunar.getMonth() + 1,
        isAuspicious,
        isInauspicious,
    };
};
