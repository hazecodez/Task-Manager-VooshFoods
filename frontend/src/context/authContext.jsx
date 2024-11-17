import { createContext, useState } from "react";
import api from "../services/apis";
import PropTypes from "prop-types";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const loggedInUser = await api.login(credentials);
    if (loggedInUser.token) {
      toast.success("Successfully logged");
      setUser(loggedInUser);
      return loggedInUser;
    } else {
      toast.error(loggedInUser.message);
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
