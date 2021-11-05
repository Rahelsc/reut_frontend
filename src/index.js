import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextPovider } from "./context/AuthContext";
import { OtherUsersContextPovider } from "./otherUsersContext/OtherUsersContext";
import { SocketContextPovider } from "./socketContext/SocketContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextPovider>
      <OtherUsersContextPovider>
        <SocketContextPovider>
          <App />
        </SocketContextPovider>
      </OtherUsersContextPovider>
    </AuthContextPovider>
  </React.StrictMode>,
  document.getElementById("root")
);
