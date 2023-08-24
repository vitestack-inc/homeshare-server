import app from './app.js';
import 'dotenv/config';
import http from 'http';
import connectDB from './connectDB.js';

const PORT = process.env.PORT ?? 8000;

const server = http.createServer(app);

async function startServer (): Promise<void> {
  await connectDB();
  server.listen(PORT, () => { console.log(`running on port : ${PORT}`); });
}

await startServer();
