import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import { ReactDOM } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import SocketProvider from "./contexts/SocketContext";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <SocketProvider>
    <App />
    <Toaster closeButton />
  </SocketProvider>
  //</StrictMode>
);

/*
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";

ReactDOM.render(
  <>
    <App />
    <Toaster />
  </>,
  document.getElementById("root")
);
*/
