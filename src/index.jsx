import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { StateContextProvider } from "./StateContext";
import Navbar from './components/Navbar/Navbar'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <StateContextProvider>
      <Navbar />
      <App />
    </StateContextProvider>
  </BrowserRouter>
);
