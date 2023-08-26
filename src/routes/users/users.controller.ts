import { type Request, type Response } from 'express';
import { getAllUsers, createUser } from '../../models/users.model.js';

export async function httpGetAllUsers (req: Request, res: Response): Promise<Response> {
  return res.status(200).json(await getAllUsers());
}

export async function httpCreateUser (req: Request, res: Response): Promise<Response> {
  return res.status(200).json(await createUser(req.body));
}
