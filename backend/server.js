import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from './Config/db.js';
import authRoutes from './Routes/authRoutes.js'
import { connectRedis } from './Utils/redisClient.js';

dotenv.config();

const app = express();
app.use(cors({
    origin: "https://uplify.onrender.com",
    credentials: true
}));
app.use(express.json());

await connectRedis();
connectDB();

app.get('/', (req, res) => {
    res.send('server sun raha hai')
})
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running at port ${PORT}`));