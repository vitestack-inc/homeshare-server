import { type NextFunction, type Request, type Response } from 'express';
import { type Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import { createUser } from '../../models/users.model.js';
import UserModel from '../../models/users.schema.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';
import bcrypt from 'bcrypt';

interface UserSignupDocument extends Document {

  name: string
  email: string
  password: string
  confirmPassword?: string
  age: number

}

export const httpUserSignup = catchAsync(async function (req: Request, res: Response, next: NextFunction): Promise<Response> {
  // pick only needed data to prevent injection attacks of unwanted data
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    age: req.body.age
  };

  const newUser = await createUser(data) as UserSignupDocument;
  // Set the password to undefined so it won't be returned in the response
  if ((newUser as any).password !== undefined) {
    (newUser as any).password = undefined;
  }
  const token = getSignedToken(newUser._id);

  return res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
      token
    }
  });
});

export const httpUserLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const { email, password } = req.body;

    // 1) Check if email and password exist in the request body
    if (email === undefined || email === null || password === undefined || password === null) {
      next(new AppError('Please provide email and password!', 400)); return;
    }

    // 2) Check if user exists in DB
    const user = await UserModel.findOne({ email }).select('+password');
    if (user === null) {
      next(new AppError('Incorrect email', 401));
      return;
    }
    // check if inputed password is correct
    const correct = await correctPassword(password, user.password ?? '');

    if (correct) {
      // jwt method. create a signed token
      const token = getSignedToken(user.id);
      return res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        token
      });
    }

    next(new AppError('Incorrect password', 401));
  }
);

const correctPassword = async function (candidatePassword: string, userPassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const getSignedToken = function (id: string): string {
  return jwt.sign({ id },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN });
};
