import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextPovider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextPovider>
      <App />
    </AuthContextPovider>
  </React.StrictMode>,
  document.getElementById("root")
);
