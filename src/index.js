// Imporing the necessary dependencies
import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import App from "./App";
import "./assets/css/bootstrap.min.css";
import "./assets/css/paper-kit.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
