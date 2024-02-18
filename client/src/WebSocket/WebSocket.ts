import { io, Socket } from 'socket.io-client';


interface User {
  id: string;
  name: string;
  time: number;
}

export class WebSocket {
  socket: Socket;

  constructor(roomId: string, userId: string) {
    this.socket = io(`http://${process.env.API_URL}:3001`, {
      query: {
        roomId,
        userId,
      },
    });
  }

  addUser (name: string) {
    this.socket.emit('user_connected', name);
  }

  userChange (userParams: Partial<User>) {
    this.socket.emit('user_change_info', userParams);
  }

  changeUsersSubscribe (handler: (users: User[]) => void) {
    this.socket.on('change_users', (users: User[]) => handler(users));
  }
}
