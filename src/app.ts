import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRouter from './routes/users/users.router.js';

const app: Express = express();
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use('/users', userRouter);

export default app;
