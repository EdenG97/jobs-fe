import { createContext, useContext, useState } from "react";

interface IInitialState {
  token: string;
  setTokenStorage: (token: string) => void;
  removeTokenStorage: () => void;
}

const initialState: IInitialState = {
  token: "",
  setTokenStorage: () => {},
  removeTokenStorage: () => {},
};

const AuthContext = createContext<IInitialState>(initialState);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialValue = localStorage.getItem("token") || "";
  const [token, setToken] = useState(initialValue);

  function setTokenStorage(token: string) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  function removeTokenStorage() {
    localStorage.removeItem("token");
    setToken("");
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setTokenStorage,
        removeTokenStorage,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
