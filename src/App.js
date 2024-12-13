import React from "react"; //import react
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./styles/App.css";
import PageNotFound from "./PageNotFound";
import { AuthContextProvider } from "./context/AuthContext";
import Details from "./components/Details";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatApp from './components/ChatApp';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div>
          {/* Sleek Navigation Bar */}
          <nav className="navbar" style={{ display: "none" }}>
            <h1 style={{ color: "white", padding: "5px", marginTop: "0px" }}>ADMIN CONTROLLER</h1>
            <ul className="nav-links">
              <li>
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="nav-link">Sign Up</Link>
              </li>
              <li>
                <Link to="/details" className="nav-link">Details</Link>
              </li>
            </ul>
          </nav>

          {/* Routes for the Pages */}
          <div className="content-routes">
              <Routes>
                <Route path="/details" element={
                  <ProtectedRoute>
                    <Details />
                  </ProtectedRoute>
                } />
                <Route path="/chat" element={
                  <ProtectedRoute>
                    <ChatApp />
                  </ProtectedRoute>
                } />
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<div>Forgot Password Page</div>} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
          </div>
        </div>
      </Router>
    </AuthContextProvider >
  );
}

export default App;
