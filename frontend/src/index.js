import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
import EnemyPokemon from './Components/EnemyPokemon';
import Battle from './Components/Battle';
import Lost from './Components/Lost';
import Won from './Components/Win';
import Header from './Components/Layout/Header';
import Login from './Components/Login';
import Register from './Components/Register';
import Welcome from './Components/Welcome';
import Admin from './Components/Admin';
import User from './Components/User';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/enemy/:num",
        element: <EnemyPokemon />
      },
      {
        path: "/battle/:own/:enemy",
        element: <Battle />
      },
      {
        path: "/lost",
        element: <Lost />
      },
      {
        path: "/won",
        element: <Won />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
