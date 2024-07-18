import express from 'express';
import dotenv from "dotenv"
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

import authRoute from '../backend/routes/auth.routes.js';
import messageRoute from '../backend/routes/message.routes.js'
import userRouter from '../backend/routes/user.routes.js'


app.use("/api/auth", authRoute)
app.use("/api/message", messageRoute)
app.use("/api/user", userRouter)

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`listening on port ${PORT}`)
})