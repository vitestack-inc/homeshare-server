import { type Request, type Response } from 'express';

export function getAllUsers (req: Request, res: Response): void {
  res.status(200).json({
    message: 'GET all users',
    data: ['user1', 'user2', 'user3']
  });
}
