import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { RootLayout } from "./pages/RootLayout";
import { Home } from "./pages/home/Home";
import { LoginPage } from "./pages/authentication/login/LoginPage";
import { Authentication } from "./pages/authentication/Authentication";
import { HomePage } from "./pages/home/homePage/HomePage";

import "./App.css";
import { VrpPage } from "./pages/vrp/VrpPage";
import { checkAuthLoader } from "./utils/loaders/checkAuthLoader";
import { ErrorPage } from "./pages/error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Authentication />,
        children: [{ index: true, element: <LoginPage /> }],
      },
      {
        path: "/home",
        element: <Home />,
        loader: checkAuthLoader,
        children: [{ index: true, element: <VrpPage/> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
