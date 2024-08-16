import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './assets/css/style.css';
import App from "./App.jsx";

import router from "./router.jsx";
import { RouterProvider } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App>
      </App>
    </RouterProvider>
  </StrictMode>
);
