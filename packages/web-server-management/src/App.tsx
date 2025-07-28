import React from "react";
import * as styles from "./App.module.less";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { ROUTES } from "./routes";

export const App = () => {
  return (
    <BrowserRouter>
      <InnerApp />
    </BrowserRouter>
  );
};

function InnerApp() {
  const routes = useRoutes(ROUTES);
  return <div className={styles.app}>{routes}</div>;
}
