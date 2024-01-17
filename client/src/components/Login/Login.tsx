import * as React from 'react';


interface Props {
  onSubmit: (value: string) => void;
}

const Login: React.FC<Props> = (props) => {
  const { onSubmit } = props;
  const [ name, setName ] = React.useState('');

  return (
    <form onSubmit={() => onSubmit(name)}>
      <input type="text" onChange={({ target: { value } }) => setName(value)}/>
      <button
        type="submit"
        onClick={() => onSubmit(name)}
      >
        Подключиться
      </button>
    </form>
  );
};

export default Login;
