import PropTypes from "prop-types";

import { Navigate } from "react-router-dom";

export const Protect = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export const Public = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
};

Protect.propTypes = {
  children: PropTypes.node.isRequired,
};

Public.propTypes = {
  children: PropTypes.node.isRequired,
};
