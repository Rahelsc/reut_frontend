import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextPovider } from "./context/AuthContext";
import { SocketContextPovider } from "./socketContext/SocketContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextPovider>
        <SocketContextPovider>
          <App />
        </SocketContextPovider>
    </AuthContextPovider>
  </React.StrictMode>,
  document.getElementById("root")
);
