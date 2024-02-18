import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WebSocket } from '../../WebSocket/WebSocket';
import {AppContext} from "../App";


const Room = () => {
  const webSocket = React.useMemo(() => {
    const userId = localStorage.getItem('userId') || uuidv4();
    const roomId = window.location.pathname.replace('/', '');

    !localStorage.getItem('userId') && localStorage.setItem('userId', userId);

    return  new WebSocket(roomId, userId);
  }, []);
  const [ users, setUsers ] = React.useState([]);
  const {
    context: { userName },
  } = React.useContext(AppContext);

  React.useEffect(() => {
    webSocket.addUser(userName);
    webSocket.changeUsersSubscribe(setUsers);
  }, []);

  const [ name, setName ] = React.useState('');
  const handleClick = () => webSocket.userChange({ name });

  return (
    <div>
      {userName === '' && (
        <div>
          <input type="text" onChange={({target: {value}}) => setName(value)}/>
          <button onClick={() => handleClick()}>Click!</button>
        </div>
      )}
      <div style={{ display: 'flex', gap: 10 }}>
        {users.map(user => (
          <div>
            <div style={{ width: 50, height: 100, border: '1px solid' }}>
            </div>
            <p style={{ fontSize: 10, color: 'grey' }}>{user.isAdmin && 'Admin'}</p>
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
