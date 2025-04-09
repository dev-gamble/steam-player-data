import express from 'express';
import cors from 'cors';
import NodeCache from 'node-cache';
import steamRoutes from './routes/steam.routes'
import { cacheLatestExchangeRates } from './services/exchange-rate.service';

const app: express.Application = express();
const PORT = 3001;

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/api/steam', steamRoutes);

// Create a cache with a 1-hour TTL (3600 seconds)
const cache = new NodeCache({ stdTTL: 3600 });
app.locals.cache = cache;

// Set cache
(async () => {
    try {
        await cacheLatestExchangeRates(app.locals.cache);
        console.log('Exchange rates cached.');
    } catch (err) {
        console.error('Failed to retrieve exchange rates.', err);
    }
})();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

export default app;