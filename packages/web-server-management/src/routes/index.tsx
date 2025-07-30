import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { AppLayout } from "../layout";
import { CommentsManagement } from "../pages/comments-management";
import { SettingsManagement } from "../pages/settings-management";

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
        path: "settings-management",
        element: <SettingsManagement />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
