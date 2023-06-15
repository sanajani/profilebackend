import express from 'express';
import dotenv from 'dotenv';
import { userMessagerouter } from './routes/getUserMessageRoute.js';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(express.json())
dotenv.config();
app.use(cors())
app.use(morgan('dev'))


// routes 
app.use('/gmail',userMessagerouter)


const PORT = process.env.PORT || 7000

app.listen(PORT,() => {
    console.log(`your server is running on ${PORT}`);
})