import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { AppLayout } from "../layout";
import { Login } from "./login";
import { HomePage } from "./home";
import { TestPage } from "./test";
import { SitePages } from "./site-pages";

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
        path: "site-pages",
        element: <SitePages />,
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
