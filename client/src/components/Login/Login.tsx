import * as React from 'react';
import {useNavigate, NavigateFunction} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../App';


type HandleClick = (name: string, navigate: NavigateFunction, handleChangeContext: any) => void;

const handleClick: HandleClick = (name, navigate, handleChangeContext) => {
  localStorage.setItem('userName', name);

  const pathName = uuidv4();

  handleChangeContext({
    roomId: pathName,
    userName: name,
  });

  navigate(`/${pathName}`);
};

const Login: React.FC = () => {
  const [ name, setName ] = React.useState('');
  const navigate = useNavigate();
  const { handleChangeContext } = React.useContext(AppContext);

  return (
    <form>
      <input type="text" onChange={({ target: { value } }) => setName(value)}/>
      <button
        type="submit"
        onClick={() => handleClick(name, navigate, handleChangeContext)}
      >
        Подключиться
      </button>
    </form>
  );
};

export default Login;
