import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.less";
import React from "react";

createRoot(document.querySelector("#root")!).render(<App />);
