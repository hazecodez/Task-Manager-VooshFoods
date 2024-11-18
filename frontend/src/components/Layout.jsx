import { useContext } from "react";
import AuthContext from "../context/authContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Layout({ children }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const user = localStorage.getItem("token");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="flex">
      <div className="flex-1">
        {/* Navbar */}
        <nav className="bg-gray-900 p-4 flex justify-between items-center">
          <p
            onClick={() => navigate("/")}
            className="text-[#f0eee4] text-2xl font-bold cursor-pointer"
          >
            Task Management
          </p>

          <div className="flex gap-4">
            {user ? (
              <div
                onClick={handleLogout}
                className="w-8 h-8 flex items-center justify-center transition-colors duration-500 bg-[#f0eee4] rounded-full hover:bg-gray-800"
              >
                <i className="fa-solid fa-right-from-bracket cursor-pointer text-2xl text-black hover:text-[#f0eee4] transition-colors duration-500" />
              </div>
            ) : (
              <div
                onClick={() => navigate("/login")}
                className="w-8 h-8 flex items-center justify-center transition-colors duration-500 bg-[#f0eee4] rounded-full hover:bg-gray-800"
              >
                <i className="fa-solid fa-right-to-bracket cursor-pointer text-2xl text-black hover:text-[#f0eee4] transition-colors duration-500" />
              </div>
            )}
          </div>
        </nav>

        {/* Main content (children) */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
