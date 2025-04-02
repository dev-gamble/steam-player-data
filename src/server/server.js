import express from 'express';
import dotenv from 'dotenv';
import steamRoutes from './routes/steamRoutes.mjs'

dotenv.config();

const app = express();
const PORT = 3001;

app.use('/api/steam', steamRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})