import { createContext, useState } from "react";

export const FeedContext = createContext({
  postBeforeRefresh: [],
  setPostBeforeRefresh: () => {},
});

export const FeedContextPovider = ({ children }) => {
  const [postBeforeRefresh, setPostBeforeRefresh] = useState([]);
  return (
    <FeedContext.Provider
      value={{
        postBeforeRefresh,
        setPostBeforeRefresh,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};
