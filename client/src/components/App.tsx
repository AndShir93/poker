import * as React from 'react';
import { io, Socket } from 'socket.io-client';


interface Client {
  id: string;
  name?: string;
  time?: string;
}

const socket = io('http://localhost:3001');

const App = () => {
  const [ id, setId ] = React.useState('');
  const [ name, setName ] = React.useState('');
  const [ users, setUsers ] = React.useState<Client[]>([]);

  React.useEffect(() => {
    socket.on('client_connect', (id: string) => setId(id));
    socket.on('change_client_info', (users: Client[]) => setUsers(users));
  }, []);

  function sendMessageToServer(sockets: Socket) {
    sockets.emit('message', id, name);
  }

  const chooseTime = (id: string, time: number) => socket.emit('choose_time', id, time);

  return (
    <div>
      <div>
        <input type="text" onBlur={({target: {value}}) => setName(value)}/>
        <button onClick={() => sendMessageToServer(socket)}>
        Send message to server
        </button>
        <ul>
      {users.map((user, index) => (
        <li>{user.name}: {user.time}</li>
        ))}
        </ul>
        <input type="number" onBlur={({ target: { value } }) => chooseTime(id, Number(value))}/>
      </div>
    </div>
  );
};

export default App;
