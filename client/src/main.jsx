import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './assets/css/style.css';
import App from "./App.jsx";
import router from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './stores/store.js';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App>
        </App>
      </RouterProvider>
    </Provider>
  </StrictMode>
);
