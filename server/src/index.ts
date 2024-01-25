import http from 'http';
import { WebSocket, WebSocketServer, on } from 'ws';
import express from 'express';
import { roomRouter } from './routers/roomRouter';
import { userRouter } from './routers/userRouter';
import {
  createNewMessage,
  messageException,
  messageRouter,
} from './routers/messageRouter';
const app = express();
const port = 3000;
let clientsSet!: { userId: string; socket: WebSocket }[];
const server = http.createServer(app);
const path = '/ws';
const wss = new WebSocketServer({ server, path });

wss.on('connection', (ws, req): void => {
  console.log('ws connected with' + req.url);
  try {
    let userId = req.url?.split('=')[1];
    if (userId && userId?.length < 24) {
      clientsSet.push({ userId: userId, socket: ws });
    }
  } catch (error) {
    ws.send(JSON.stringify({ err: error }));
  }
  ws.on('message', (message: any) => {
    console.log('received: %s', message);
    try {
      message = JSON.parse(message);
    } catch (error) {
      const err = { errorMessage: 'can not create message' };
      ws.send(JSON.stringify(err));
    }
    createNewMessage(message)
      .then((result) => {
        console.log('logging in result', result);
        sendMessageToClients(JSON.stringify(result));
      })
      .catch((err: Error) => {
        console.log('logging', err);
        const error: messageException = {
          error: {
            name: err.name,
            message: err.message,
          },
        };
        sendMessageToClients(JSON.stringify(error));
      });
  });
});
function sendMessageToClients(message: any) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
app.use('/rooms', roomRouter);
app.use('/users', userRouter);
app.use('/messages', messageRouter);
app.get('/health', (req, res) => {
  res.json({ msg: 'I am healthy' });
});

server.listen(port);
