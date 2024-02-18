import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import {routes} from "../routes";


interface Context {
  roomId: string;
  userName: string;
  setRoomId: React.Dispatch<React.SetStateAction<Context>>,
}

export const AppContext = React.createContext(null);

const App = () => {
  const [ context, setContext ] = React.useState<Omit<Context, 'setRoomId'>>({
    roomId: '',
    userName: '',
  })
  const handleChangeContext = (contextParams: Partial<Context>) => {
    setContext(prevState => ({
      ...prevState,
      ...contextParams,
    }));
  };

  return (
    <AppContext.Provider value={{ context, handleChangeContext }}>
      <RouterProvider router={routes}/>
    </AppContext.Provider>
  );
};

export default App;
