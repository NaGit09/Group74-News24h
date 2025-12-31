export interface GoldPrice {
    name: string;
    buyToday: string;
    sellToday: string;
    buyYesterday: string;
    sellYesterday: string;
    change: string;
}

export interface GoldDataResult {
    updateTime: string;
    unit: string;
    prices: GoldPrice[];
}
