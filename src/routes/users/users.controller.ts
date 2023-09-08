import { type NextFunction, type Request, type Response } from 'express';
import { getAllUsers, getUser, createUser } from '../../models/users.model.js';
import catchAsync from '../../utils/catchAsync.js';

export const httpGetAllUsers = catchAsync(async function (req: Request, res: Response, next: NextFunction): Promise<void> {
  res.status(200).json(await getAllUsers());
});
// get single user by ID
export const httpGetUserById = catchAsync(async function (req: Request, res: Response, next: NextFunction): Promise<void> {
  const id: string = req.params.id;
  res.status(200).json(await getUser(id));
});

export const httpCreateUser = catchAsync(async function (req: Request, res: Response): Promise<Response> {
  return res.status(200).json(await createUser(req.body));
});

// Path: src/routes/users/users.router.ts

// export async function httpUpdateUser (req: Request, res: Response): Promise<Response> {
//   // return res.status(200).json(await (req.body));
// }
