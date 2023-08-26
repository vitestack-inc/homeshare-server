import UserModel from './users.schema.js';

export async function getAllUsers (): Promise<Array<typeof UserModel> | Error> {
  console.log('getAllUsers calling ');
  try {
    return await UserModel.find({});
  } catch (error) {
    console.log(error);
    throw new Error('Error while getting all users');
  }
}

export async function createUser (user: typeof UserModel): Promise< string | Error> {
  const userData = {
    ...user,
    createdAt: new Date(),
    updatedAt: new Date()

  };
  try {
    await UserModel.create(userData);
    return 'User created successfully';
  } catch (error) {
    console.log(error);
    throw new Error('Error while creating user');
  }
}
