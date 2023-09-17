import AppError from '../utils/appError.js';

import { type Request, type Response, type NextFunction } from 'express';

interface ErrorWithCode extends AppError {
  code?: number
}

const handleCastErrorDB = (err: AppError): AppError => {
  const message = `Invalid ${err.path ?? 'Unknown error path'}: ${err.value ?? ''}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: AppError): AppError => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0] ?? '';
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: AppError): AppError => {
  const errors = Object.values((err.errors != null) || {}).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err: AppError, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err: AppError, res: Response): void => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

export default (err: AppError, req: Request, res: Response, next: NextFunction): void => {
  err.statusCode = err.statusCode ?? 500;
  err.status = err.status ?? 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error: ErrorWithCode = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
