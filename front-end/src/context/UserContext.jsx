import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const user = {
    isUserLoggedIn,
    setIsUserLoggedIn,
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
