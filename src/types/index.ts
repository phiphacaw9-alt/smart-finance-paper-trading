// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}

// Trading types
export interface Trade {
  id: string;
  userId: string;
  symbol: string;
  entryPrice: number;
  exitPrice?: number;
  quantity: number;
  side: 'long' | 'short';
  status: 'open' | 'closed' | 'canceled';
  entryTime: Date;
  exitTime?: Date;
  profit?: number;
  profitPercent?: number;
}

export interface Order {
  id: string;
  userId: string;
  symbol: string;
  type: 'market' | 'limit';
  side: 'buy' | 'sell';
  quantity: number;
  price?: number;
  status: 'pending' | 'filled' | 'failed' | 'canceled';
  createdAt: Date;
  filledAt?: Date;
}

export interface Strategy {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type: 'rsi' | 'macd' | 'bollinger' | 'custom';
  parameters: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
}

export interface Position {
  id: string;
  userId: string;
  symbol: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  unrealizedProfit: number;
  unrealizedProfitPercent: number;
}

// API Key types
export interface ApiKey {
  id: string;
  userId: string;
  exchange: 'binance' | 'coinbase' | 'kraken';
  name: string;
  publicKey: string;
  encryptedSecretKey: string;
  isActive: boolean;
  isSandbox: boolean;
  createdAt: Date;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'trade' | 'alert' | 'system' | 'error';
  message: string;
  isRead: boolean;
  createdAt: Date;
}

// Candle/OHLCV types
export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
}
