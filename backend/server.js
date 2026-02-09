import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from './Config/db.js';
import authRoutes from './Routes/authRoutes.js'
import geminiRoutes from './Routes/geminiRoutes.js'

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://uplify.live",
    "https://www.uplify.live",
    "https://uplify-alpha.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());
connectDB();

app.get('/', (req, res) => {
    res.send('server sun raha hai')
})

app.use('/api/auth', authRoutes);
app.use('/api/user', authRoutes);
app.use('/api',geminiRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running at port ${PORT}`));