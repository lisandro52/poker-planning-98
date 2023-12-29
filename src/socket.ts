import { io } from 'socket.io-client';

const URL = process.env.SOCKET_SERVER_URL ?? 'http://localhost:3001';

export const socket = io(URL, {
  autoConnect: false,
  path: process.env.PRODUCTION ? '/socket.io' : undefined,
});
