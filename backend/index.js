import express from 'express';
const app = express();
import cors from "cors";
import bodyParser from 'body-parser';
import { configurations } from './config.js';
import 'dotenv/config';

import { router as userRoutes } from './routes/User.js';
import { router as messageRoutes } from './routes/Message.js';
import { router as roomRoutes } from './routes/Room.js';
import { auth } from './utils/passport.js';
auth();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(bodyParser.json());
configurations();

app.use('/users', userRoutes);
app.use('/rooms', roomRoutes);
app.use('/messages', messageRoutes);

app.get('/', function (req, res) {
    res.status(200).send('Hello');
});

app.listen(3001, () => {
    console.log(`Your server is running on port ${process.env.PORT}`);
});