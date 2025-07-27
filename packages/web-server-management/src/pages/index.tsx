import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { AppLayout } from "../layout";
import { Login } from "./login";
import { SiteInfoPage } from "./site-info";
import { HomePage } from "./home";
import { TestPage } from "./test";

export const ROUTES: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "sites",
        element: <SiteInfoPage />,
      },
      {
        path: "test",
        element: <TestPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
