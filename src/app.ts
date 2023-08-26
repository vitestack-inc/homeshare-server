import express, { type Express, type Response, type Request, type NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './routes/router.js';

const app: Express = express();
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use('/api/v1/', router).all('*', (req, res, next) => {
//   res.status(404).json({ error: `invalid URL. "${req.originalUrl}" not found` });
  const err = new Error(`invalid URL. "${req.originalUrl}" not found`);
  next(err);
});

app.use((err: Error & { statusCode: number }, req: Request, res: Response, next: NextFunction): void => {
  err.statusCode = err.statusCode ?? 500;
  err.message = err.message ?? 'Internal Server Error';
  console.log(err.stack);
  res.status(err.statusCode).json({ error: err.message });
  next();
});

export default app;
