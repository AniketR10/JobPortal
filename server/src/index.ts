import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import appRoutes from './routes/appRoutes.js';

dotenv.config();

const app = express();

// middleware
app.use(cors({
    origin: [
        'http://localhost:5173', 
        "https://job-portal-frontend-ten-ashen.vercel.app"
    ],
    credentials: true,
}));
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', appRoutes);

// db connect
mongoose.connect(process.env.MONGO_URI as string)
.then(() => {
    console.log('Mongodb connected!');
    const dbname = mongoose.connection.name;
    console.log('dbName: ', dbname);
})
.catch((err) => console.error('mongodb connection error!', err))

app.get('/', (req, res) => {
    res.send('job portal api is running')
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

