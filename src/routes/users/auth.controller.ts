import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { createUser } from '../../models/users.model.js';
import catchAsync from '../../utils/catchAsync.js';
// import AppError from '../../utils/appError.js';

export const httpUserSignup = catchAsync(async function (req: Request, res: Response, next: NextFunction): Promise<Response> {
  // pick only needed data to prevent injection attacks of unwanted data
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    age: req.body.age
  };
  console.log(data, 'before create user');

  const newUser = await createUser(data);
  console.log(newUser, 'after create user');
  const token = jwt.sign({ id: newUser._id },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN });

  return res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
      token
    }
  });
});
