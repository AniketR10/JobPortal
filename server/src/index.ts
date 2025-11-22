import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);

// db connect
mongoose.connect(process.env.MONGO_URI as string)
.then(() => {
    console.log('Mongodb connected!');
    const dbname = mongoose.connection.name;
    console.log('dbName: ', dbname);
})
.catch((err) => console.error('mongodb connection error!'))

app.get('/', (req, res) => {
    res.send('job portal api is running')
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

