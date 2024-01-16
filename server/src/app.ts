import { Server } from 'socket.io';


interface Client {
  id: string;
  name?: string;
  time?: number;
}

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = new Server(http, {
  cors: {
    origin: '*',
  },
})

const host = 'localhost';
const port = 3001;

let clients: Client[] = [];

io.on('connection', (socket) => {
  socket.emit('client_connect', socket.id);

  socket.emit('change_client_info', clients);

  socket.on('message', (id: string, client: string) => {
    const currentClientIndex = clients.findIndex(({ id: clientId }) => clientId === id);
    const currentClient: Client = currentClientIndex !== -1
      ? clients[currentClientIndex]
      : {
        id,
        name: client,
      };

    const actualClients: Client[] = currentClientIndex !== -1
      ? [...clients].splice(
        currentClientIndex,
        1,
        currentClient,
      )
      : [ ...clients, currentClient ];
    clients = [...actualClients];

    io.sockets.emit('change_client_info', actualClients);
  });

  socket.on('choose_time', (id: string, time: number) => {
    const currentClientIndex = clients.findIndex(({ id: clientId }) => clientId === id);
    if (currentClientIndex === -1) return;
    const arr = [...clients];
    arr.splice(
      currentClientIndex,
      1,
      {
        ...clients[currentClientIndex],
        time,
      },
    );

    clients = arr;

    io.sockets.emit('change_client_info', arr);
  });

  // socket.on('disconnect', () => {
  //   clients.slice(clients.indexOf(socket.id), 1);
  //   console.log(`Client with id ${socket.id} disconnected`);
  // });
});

app.use(express.static(__dirname));

http.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
);
