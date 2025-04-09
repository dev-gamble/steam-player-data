import NodeCache from 'node-cache';

const key = process.env.EXCHANGE_RATE_API_KEY;

// Latest Exchange Rates
export const cacheLatestExchangeRates = async (cache: NodeCache): Promise<void> => {
    const res = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${key}`);
    const data = await res.json();
    
    cache.set('exchangeRates', data.rates);
}