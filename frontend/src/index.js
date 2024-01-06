import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Battle from "./Components/Battle";
import Lost from "./Components/Lost";
import Won from "./Components/Win";
import Header from "./Components/Layout/Header";
import Welcome from "./Components/Welcome";
import Admin from "./Components/Admin";
import User from "./Components/User";
import PokemonData from "./Components/Pokemondata";
import StarterPack from "./Components/StarterPack";
import Map from "./Components/Map";
import City from "./Components/City";

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
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/battle",
        element: <Battle />,
      },
      {
        path: "/lost",
        element: <Lost />,
      },
      {
        path: "/won",
        element: <Won />,
      },
      {
        path: "/data",
        element: <PokemonData />,
      },
      {
        path: "/starterpack",
        element: <StarterPack />,
      },
      {
        path: "/map",
        element: <Map />,
      },
      {
        path: "/city/:id",
        element: <City />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
