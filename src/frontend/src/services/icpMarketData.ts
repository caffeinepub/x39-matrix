/**
 * ICP Market Data Service
 * Fetches live market data from Binance API with automatic fallback to backend proxy
 * Ensures worldwide reliability across all browsers and network conditions
 */

import type { backendInterface } from '../backend';

// Timeout for direct API calls (Safari-compatible)
const FETCH_TIMEOUT_MS = 8000;

export interface ICPPriceData {
  price: number;
  change24h: number;
  marketCap: number;
  lastUpdate: number;
}

export interface ICPKlineData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/**
 * Fetch with timeout support
 */
async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Fetch ICP price data with automatic fallback to backend proxy
 */
export async function fetchICPPrice(actor?: backendInterface | null): Promise<ICPPriceData> {
  let lastError: Error | null = null;

  // Try direct Binance API first
  try {
    const response = await fetchWithTimeout(
      'https://api.binance.com/api/v3/ticker/24hr?symbol=ICPUSDT',
      FETCH_TIMEOUT_MS
    );
    
    if (!response.ok) {
      throw new Error(`Binance API returned ${response.status}`);
    }

    const data = await response.json();
    const price = parseFloat(data.lastPrice);
    const change24h = parseFloat(data.priceChangePercent);
    
    // Calculate approximate market cap (ICP has ~500M circulating supply)
    const circulatingSupply = 500000000;
    const marketCap = price * circulatingSupply;
    
    return {
      price,
      change24h,
      marketCap,
      lastUpdate: Date.now(),
    };
  } catch (error) {
    console.warn('Direct Binance API failed, trying backend proxy:', error);
    lastError = error as Error;
  }

  // Fallback to backend proxy
  if (actor) {
    try {
      const proxyResult = await actor.proxyIcpPrice();
      const data = JSON.parse(proxyResult);
      
      const price = parseFloat(data.lastPrice);
      const change24h = parseFloat(data.priceChangePercent);
      const circulatingSupply = 500000000;
      const marketCap = price * circulatingSupply;
      
      return {
        price,
        change24h,
        marketCap,
        lastUpdate: Date.now(),
      };
    } catch (proxyError) {
      console.error('Backend proxy also failed:', proxyError);
      throw new Error('Both direct and proxy price fetch failed');
    }
  }

  // No actor available, throw original error
  throw lastError || new Error('Unable to fetch ICP price');
}

/**
 * Fetch ICP klines (candlestick data) with automatic fallback to backend proxy
 */
export async function fetchICPKlines(
  interval: string,
  limit: number,
  actor?: backendInterface | null
): Promise<ICPKlineData[]> {
  let lastError: Error | null = null;

  // Try direct Binance API first
  try {
    const response = await fetchWithTimeout(
      `https://api.binance.com/api/v3/klines?symbol=ICPUSDT&interval=${interval}&limit=${limit}`,
      FETCH_TIMEOUT_MS
    );
    
    if (!response.ok) {
      throw new Error(`Binance API returned ${response.status}`);
    }

    const data = await response.json();
    return data.map((kline: any[]) => ({
      time: kline[0],
      open: parseFloat(kline[1]),
      high: parseFloat(kline[2]),
      low: parseFloat(kline[3]),
      close: parseFloat(kline[4]),
      volume: parseFloat(kline[5]),
    }));
  } catch (error) {
    console.warn('Direct Binance API failed for klines, trying backend proxy:', error);
    lastError = error as Error;
  }

  // Fallback to backend proxy
  if (actor) {
    try {
      const proxyResult = await actor.proxyIcpKlines();
      const data = JSON.parse(proxyResult);
      
      return data.map((kline: any[]) => ({
        time: kline[0],
        open: parseFloat(kline[1]),
        high: parseFloat(kline[2]),
        low: parseFloat(kline[3]),
        close: parseFloat(kline[4]),
        volume: parseFloat(kline[5]),
      }));
    } catch (proxyError) {
      console.error('Backend proxy also failed for klines:', proxyError);
      throw new Error('Both direct and proxy klines fetch failed');
    }
  }

  // No actor available, throw original error
  throw lastError || new Error('Unable to fetch ICP klines');
}
