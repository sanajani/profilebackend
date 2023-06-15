import express from 'express';
import dotenv from 'dotenv';
import { userMessagerouter } from './routes/getUserMessageRoute.js';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';

const __dirname = path.resolve();
console.log("dirname is:",path.join(__dirname,"./naw_profile/build"))
const app = express();
app.use(express.json())
dotenv.config();
app.use(cors())
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname,"./new_profile/build")));

app.get("*",function(_,res){
    res.sendFile(path.join(__dirname,"./new_profile/build/index.html"),function(error){
        res.status(500).send(error)
    })
})

// routes 
app.use('/gmail',userMessagerouter)


const PORT = process.env.PORT || 7000

app.listen(PORT,() => {
    console.log(`your server is running on ${PORT}`);
})