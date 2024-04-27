import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import axios from "axios";
import { Provider } from "react-redux";
import  store  from "./hooks/store.js";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  // <Provider value={store}>
    <RouterProvider router={router} />
  // </Provider>
);
