import app from './app.js';
import 'dotenv/config';
import http from 'http';
import connectDB from './connectDB.js';
import scheduleMatch from './scheduleMatch.js';

const PORT = process.env.PORT ?? 8000;

const server = http.createServer(app);

async function startServer (): Promise<void> {
  await connectDB();
  scheduleMatch();
  server.listen(PORT, () => { console.log(`running on port : ${PORT}`); });
}

await startServer();

process.on('bad auth', (err: unknown) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');

  if (err instanceof Error) {
    console.log(err.name, err.message);
  }

  server.close(() => {
    process.exit(1);
  });
});
