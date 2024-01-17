import { Server } from 'socket.io';


interface User {
  id: string;
  name: string;
  time: number;
}

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = new Server(http, {
  cors: {
    origin: '*',
  },
})

const host = '192.168.5.48';
const port = 3001;

class PlanningPoker {
  users: User[];

  constructor() {
    this.users = [];
  }
  
  add (user: User) {
    this.users.push(user);
  }

  updateUser (user: Partial<User>) {
    const userIndex = this.users.findIndex(({ id }) => id === user.id);

    this.users.splice(
      userIndex,
      1,
      {
        ...this.users[userIndex],
        ...user,
      },
    );
  }

  removeUser (id: string) {
    const userId = this.users.findIndex(({ id: userId }) => userId === id);

    this.users.splice(userId, 1);
  }
}

const planningPoker = new PlanningPoker();

const { users } = planningPoker;

io.on('connection', (socket) => {
  console.log(`Новое подключение: ${socket.id}`);

  socket.emit('client_connect', socket.id);

  socket.emit('change_users', planningPoker.users);

  socket.on('add_user', (id: string, client: string) => {
    const currentClientIndex = users.findIndex(({ id: clientId }) => clientId === id);
    const currentClient: User = currentClientIndex !== -1
      ? users[currentClientIndex]
      : {
        id,
        name: client,
        time: 0,
      };

    planningPoker.add(currentClient);

    io.sockets.emit('change_users', planningPoker.users);
  });

  socket.on('choose_time', (id: string, time: number) => {
    const currentClientIndex = users.findIndex(({ id: clientId }) => clientId === id);
    if (currentClientIndex === -1) return;

    planningPoker.updateUser({
      ...users[currentClientIndex],
      time,
    });

    io.sockets.emit('change_users', planningPoker.users);
  });

  socket.on('disconnect', () => {
    console.log(`Разрыв соединения: ${socket.id}`);

    planningPoker.removeUser(socket.id);

    io.sockets.emit('change_users', planningPoker.users);
  });
});

app.use(express.static(__dirname));

http.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
);
