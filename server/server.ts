import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import {
  onCleanVotes,
  onConnect,
  onDisconnect,
  onShowVotes,
  onVote,
} from './socket-handlers.js';

const PORT = 3001;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  onDisconnect(socket, io);
  onConnect(socket, io);
  onVote(socket, io);
  onCleanVotes(socket, io);
  onShowVotes(socket, io);
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
