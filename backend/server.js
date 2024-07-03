import express from 'express';
import dotenv from "dotenv"
import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('hello world');
});

import authRoute from '../backend/routes/auth.routes.js';

app.use("/api/auth", authRoute)

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`listening on port ${PORT}`)
})