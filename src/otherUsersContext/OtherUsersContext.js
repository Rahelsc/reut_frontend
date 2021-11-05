import { createContext, useState } from "react";

// this context is meant to share across the app whether a specific user exists, so that the route can be notified when the user does not exist and trace the user to a defferent route

export const OtherUsersContext = createContext({
  otherUsers: [],
  setotherUsers: () => {},
});

export const OtherUsersContextPovider = ({ children }) => {
  const [userExists, setUserExists] = useState();
  return (
    <OtherUsersContext.Provider
      value={{
        otherUsers: userExists,
        setotherUsers: setUserExists,
      }}
    >
      {children}
    </OtherUsersContext.Provider>
  );
};
