// src/index.tsx

import React from "react";
import ReactDOM from "react-dom/client";  // Use 'react-dom/client' instead of 'react-dom'
import "./index.css";
import App from "./App";

// Create a root and render your app
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
