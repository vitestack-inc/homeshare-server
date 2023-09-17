import UserModel from './users.schema.js';
import { type IUserSignup } from '@Vite/bl/user/types.js';
import { type Document } from 'mongoose';

export async function getAllUsers (): Promise<Document[]> {
  return await UserModel.find({});
}

export async function getUser (id: string): Promise<Document | null> {
  return await UserModel.findById(id);
}

export async function createUser (user: IUserSignup): Promise<Document> {
  const userData = {
    ...user,
    createdAt: new Date(),
    updatedAt: new Date()

  };
  // await UserModel.init();

  return await UserModel.create(userData);
}
