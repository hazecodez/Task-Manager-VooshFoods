import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { Protect, Public } from "./middleware/authMiddleware";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <Public>
                <Login />
              </Public>
            }
          />
          <Route
            path="/signup"
            element={
              <Public>
                <Signup />
              </Public>
            }
          />
          <Route
            path="/"
            element={
              <Protect>
                <Home />
              </Protect>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
