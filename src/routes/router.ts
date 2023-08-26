import userRouter from './users/users.router.js';
import express from 'express';

const router = express.Router();

router.use('/users', userRouter);

export default router;
