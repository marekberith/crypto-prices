export interface CryptoData {
    name: string;
    price: number;
    change: number;
    volume: number;
    id: string;
    changePercent24Hr: number;
    explorer: string;
    marketCapUsd: number;
    maxSupply: number;
    rank: number;
    supply: number;
    symbol: string;
    checked?: boolean;
}

export interface TimeseriesData {
    changePercent24Hr: number;
    explorer: string;
    id: string;
    marketCapUsd: number;
    maxSupply: number;
    name: string;
    priceUsd: number;
    rank: number;
    supply: number;
    symbol: string;
    volumeUsd24Hr: number;
    vwap24Hr: number;
}

export interface TimeseriesResponse {
    data: TimeseriesData[];
    timestamp: number;
    error?: string;
}