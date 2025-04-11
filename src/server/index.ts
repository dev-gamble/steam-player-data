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

// // Set cache
// (async () => {
//     try {
//         app.locals.cache = new NodeCache();
//         await cacheLatestExchangeRates(app.locals.cache);
//         console.log('Exchange rates cached.');
//     } catch (err) {
//         console.error('Failed to retrieve exchange rates.', err);
//     }
// })();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

export default app;