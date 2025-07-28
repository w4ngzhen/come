import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { AppLayout } from "../layout";
import { CommentsManagement } from "../pages/comments-management";
import { TokenManagement } from "../pages/token-management";

export const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "comments-management",
        element: <CommentsManagement />,
      },
      {
        path: "token-management",
        element: <TokenManagement />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
