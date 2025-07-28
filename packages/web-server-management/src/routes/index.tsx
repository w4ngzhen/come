import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { AppLayout } from "../layout";
import { SetupToken } from "../pages/setup-token";
import { SitePages } from "../pages/site-pages";
import { SiteComments } from "../pages/site-comments";

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
