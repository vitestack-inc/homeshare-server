import mongoose from 'mongoose';

const URI = process.env.MONGO_URI ?? '';

const connectDB = async (): Promise<void> => {
  try {
    if (URI === null || URI === undefined) {
      throw new Error('DB connection string is not defined in this environment.');
    }
    const conn = await mongoose.connect(URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    process.exit(1);
  } finally {
    mongoose.connection.once('connected', () => {
      console.log('Mongoose is connected');
    });

    mongoose.connection.on('error', (err) => {
      console.error(err, 'MONGOOSE CONNECTION ERROR');
    });
  }
};

export default connectDB;
