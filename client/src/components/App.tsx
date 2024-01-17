import * as React from 'react';
import { io, Socket } from 'socket.io-client';
import classes from './App.module.css';


interface Client {
  id: string;
  name?: string;
  time?: string;
}

const socket = io('http://192.168.5.48:3001');

const App = () => {
  const [ id, setId ] = React.useState('');
  const [ name, setName ] = React.useState('');
  const [ users, setUsers ] = React.useState<Client[]>([]);
  const [ evaluation, setEvaluation ] = React.useState(0);
  const [ showEvaluation, setShowEvaluation ] = React.useState(false);

  React.useEffect(() => {
    socket.on('client_connect', (id: string) => setId(id));
    socket.on('change_users', (users: Client[]) => setUsers(users));
  }, []);

  const sendName = () => {
    socket.emit('add_user', id, name);
  }

  const chooseTime = (id: string, time: number) => socket.emit('choose_time', id, time);

  console.log('users', users);

  return (
    <div className={classes.root}>
        <input type="text" onBlur={({target: {value}}) => setName(value)}/>
        <button onClick={() => sendName()}>
          Подключиться
        </button>
        <input type="number" onBlur={({ target: { value } }) => setEvaluation(Number(value))}/>
        <button
          disabled={!users.find(({ name: clientName }) => clientName === name)}
          onClick={() => chooseTime(id, evaluation)}
        >
          Оценить
        </button>
      <div className={classes.cardWrapper}>
        {users.map((user, index) => (
          <div className={classes.user}>
            <div className={user.time ? `${classes.card} ${classes.cardBG}` : classes.card}>
              <p>{showEvaluation && user.time}</p>
            </div>
            <p>{user.name}</p>
          </div>
        ))}
      </div>
      <div className={classes.footer}>
        <button onClick={() => setShowEvaluation(true)}>Раскрыть карты</button>
      </div>
    </div>
  );
};

export default App;
