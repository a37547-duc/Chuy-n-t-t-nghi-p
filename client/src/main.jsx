import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './assets/css/style.css';
import App from "./App.jsx";
import router from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { store } from "./stores/store.js";
// import { persistor } from "./stores/store.js"
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer></ToastContainer>
      <RouterProvider router={router}>
        <App>
        </App>
      </RouterProvider>
    </Provider>
  </StrictMode>
);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
//         <RouterProvider router={router}>
//           <App />
//         </RouterProvider>
//       </PersistGate>
//     </Provider>
//   </StrictMode>
// );