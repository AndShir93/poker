import * as React from 'react';
import {
  createBrowserRouter,
  redirect,
  LoaderFunction,
} from 'react-router-dom';
import Login from './components/Login/Login';
import Room from './components/Room/Room';


export const LOGIN_PATHNAME = 'login';

const loader: LoaderFunction = (params) => {
  const { request: { url } } = params;
  if ((new URL(url)).pathname === '/') return redirect(`/${LOGIN_PATHNAME}`);

  return null;
};

export const routes = createBrowserRouter(
  [
    {
      loader: loader,
      path: '/',
      children: [
        {
          path: LOGIN_PATHNAME,
          element: <Login/>,
        },
        {
          path: '/:roomId',
          element: <Room/>,
        },
      ],
    },
  ],
);
