import express from 'express';
import cors from 'cors';
import steamRoutes from './routes/steam.routes'

const app: express.Application = express();
const PORT = 3001;

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/api/steam', steamRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})