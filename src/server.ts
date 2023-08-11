import app from './app.js';

import http from 'http';

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

const server = http.createServer(app);

function startServer (): void {
  server.listen(PORT, () => { console.log(`running on port : ${PORT}`); });
}

startServer();
