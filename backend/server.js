import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from './Config/db.js';
import authRoutes from './Routes/authRoutes.js'
import geminiRoutes from './Routes/geminiRoutes.js'
import JobAndInternshipRoutes from './Routes/JobAndInternshipRoutes.js';
import ResourcesRoutes from './Routes/ResourcesRoutes.js';
import MyApplicationRoutes from './Routes/MyApplicationRoutes.js';
import BlogsRoutes from './Routes/BlogsRoutes.js';
import CommunityRoutes from './Routes/CommunityRoutes.js';
import applicantRoutes from './Routes/applicantRoutes.js'

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
app.use('/api/applicants',applicantRoutes)
app.use('/api/resources', ResourcesRoutes);
app.use('/api/internships-jobs-all', JobAndInternshipRoutes);
app.use('/api/internship-jobs-delete', JobAndInternshipRoutes);
app.use('/api/job-single', JobAndInternshipRoutes);
app.use('/api/update-job', JobAndInternshipRoutes);
app.use('/api/myapplications', MyApplicationRoutes);
app.use('/api/all-blogs', BlogsRoutes);
app.use('/api/community', CommunityRoutes);
app.use('/api/add-internships', JobAndInternshipRoutes);
app.use('/api/add-blogs', BlogsRoutes);
app.use('/api/update-blogs', BlogsRoutes);
app.use('/api',geminiRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));