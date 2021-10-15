import { createContext, useState } from "react";

export const SocketContext = createContext({
  currentlyOnlineFriends: [],
  setCurrentlyOnlineFriends: () => {},
});

export const SocketContextPovider = ({ children }) => {
  const [currentlyOnlineFriends, setCurrentlyOnlineFriends] = useState([])
  return (
    <SocketContext.Provider
      value={{
        currentlyOnlineFriends,
        setCurrentlyOnlineFriends,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
