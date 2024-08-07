import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const initialState = {
  user: null,
  isAuthenticated: false,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Notes:
/**
 * Data Synchronization:
	- Multiple Tabs: If your application is open in multiple tabs, changes to local storage in one tab do not automatically update in other tabs. Consider using the storage event to synchronize data across tabs.
 */
