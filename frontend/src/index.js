import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/App.css";
import Battle from "./pages/Battle";
import Lost from "./pages/Lost";
import Win from "./pages/Win";
//import Header from "./components/Layout/Header";
import Welcome from "./pages/Welcome";
import Admin from "./pages/Admin";
import User from "./pages/User";
import PokemonData from "./pages/Pokemondata";
import StarterPack from "./pages/StarterPack";
import Map from "./pages/Map";
import City from "./pages/City";
import Hospital from "./pages/Hospital";
import Details from "./pages/Details";
import Lobby from "./pages/Lobby";
import Pvp from "./pages/Pvp";
import Header from "./components/Header";

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
        element: <Win />,
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
      {
        path: "/hospital",
        element: <Hospital />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/lobby",
        element: <Lobby />,
      },
      {
        path: "/pvp",
        element: <Pvp />,
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
