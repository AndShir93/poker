import { Server } from 'socket.io';
import { PlanningPoker, User } from './planningPoker';
import { UpdateUserParams } from './planningPoker/planningPoker';


require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = new Server(http, {
  cors: {
    origin: '*',
  },
})

const API_URL = process.env.API_URL;
const port = 3001;

const planningPoker = new PlanningPoker();

io.on('connection', (socket) => {
  const {
    handshake: {
      query: {
        roomId: userRoomId,
        userId: queryUserId,
      },
    },
  } = socket;

  const roomId = userRoomId && !Array.isArray(userRoomId) ? userRoomId : '';
  const userId = queryUserId && !Array.isArray(queryUserId) ? queryUserId : '';

  console.log(`Новое подключение: ${socket.id}`);

  socket.join(roomId);

  socket.to(roomId).emit('change_users', planningPoker.rooms[roomId] || []);

  socket.on('user_connected', (client: string) => {
    planningPoker.addUser(
      {
        id: userId,
        name: client,
      },
      roomId,
    );

    io.sockets.to(roomId).emit('change_users', planningPoker.rooms[roomId]);
  });

  socket.on('user_change_info', (userParams: UpdateUserParams) => {

    planningPoker.updateUser({
      ...userParams,
      id: userId,
    },
      roomId,
    );

    io.sockets.to(roomId).emit('change_users', planningPoker.rooms[roomId] || []);
  });

  socket.on('disconnect', () => {
    console.log(`Разрыв соединения: ${socket.id}`);

    // planningPoker.removeUser(userId, roomId);

    io.sockets.to(roomId).emit('change_users', planningPoker.rooms[roomId] || []);
  });
});

app.use(express.static(__dirname));

http.listen(port, API_URL, () =>
  console.log(`Server listens http://${API_URL}:${port}`)
);
