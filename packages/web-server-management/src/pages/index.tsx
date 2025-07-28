import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { AppLayout } from "../layout";
import { HomePage } from "./home";
import { SitePages } from "./site-pages";
import { SetupToken } from "./setup-token";
import { SiteComments } from "./site-comments";

export const ROUTES: RouteObject[] = [
  {
    path: "/setup-token",
    element: <SetupToken />,
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
        path: "site-comments",
        element: <SiteComments />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
