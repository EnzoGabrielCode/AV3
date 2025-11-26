import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Aeronaves from "./pages/aeronaves.jsx";
import Etapas from "./pages/etapas.jsx";
import Pecas from "./pages/pecas.jsx";
import Funcionarios from "./pages/funcionariosAeronave.jsx";
import Testes from "./pages/testes.jsx";
import HomeAdm from "./pages/homeAdm.jsx";
import FuncionariosAdm from "./pages/funcionariosAdm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/aeronaves/:id",
    element: <Aeronaves />,
  },
  {
    path: "/etapas",
    element: <Etapas />,
  },
  {
    path: "/pecas",
    element: <Pecas />,
  },
  {
    path: "/funcionariosAeronave",
    element: <Funcionarios />,
  },
  {
    path: "/testes",
    element: <Testes />,
  },
  {
    path: "/homeAdm",
    element: <HomeAdm />,
  },
  {
    path: "/funcionariosAdm",
    element: <FuncionariosAdm />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
