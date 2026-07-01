import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#171b22",
          color: "#fff",
          border: "1px solid #0ea5e9",
        },
      }}
    />
  </React.StrictMode>,
);
