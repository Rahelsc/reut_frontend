import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Register from "./pages/register/Register.jsx";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.js";
import Messenger from "./pages/messenger/Messenger.jsx";
import PageNotFound from "./pages/404/PageNotFound.jsx";
import { OtherUsersContext } from "./otherUsersContext/OtherUsersContext";

function App() {
  const { user } = useContext(AuthContext);
  const { otherUsers } = useContext(OtherUsersContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/login" /> : <Messenger />}
        </Route>
        <Route path="/profile/:username">
          {otherUsers ? <Profile /> : <Redirect to="/" />}
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
