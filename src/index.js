import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
import EnemyPokemon from './Components/EnemyPokemon';
import Battle from './Components/Battle';
import Lost from './Components/Lost';
import Won from './Components/Win';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <App />,
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
