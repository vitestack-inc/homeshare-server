import UserModel from './users.schema.js';
import { type Document } from 'mongoose';

export async function getAllUsers (): Promise<Document[]> {
  return await UserModel.find({});
}

export async function getUser (id: string): Promise<Document | null> {
  return await UserModel.findById(id);
}

export async function createUser (user: typeof UserModel): Promise<Document> {
  const userData = {
    ...user,
    createdAt: new Date(),
    updatedAt: new Date()

  };
  return await UserModel.create(userData);
}
