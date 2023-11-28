import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import your custom components
import Registration from "./components/Registration";
import Login from "./components/Login";
import PasswordChange from "./components/PasswordChange";
import MessagingApp from "./components/MessagingApp";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";

// Import the Footer component
import Footer from "./components/footer";

// Bootstrap import for styling
import "bootstrap/dist/css/bootstrap.min.css";

// Custom CSS import
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        {/* Hidden element with "learn react" text */}
        <div className="learn-react" style={{ display: "none" }}>
          learn react
        </div>

        {/* Define the routes using the Routes component */}
        <Routes>
          {/* Route for the Registration component */}
          <Route path="/" element={<Registration />} />

          {/* Route for the Login component */}
          <Route path="/login" element={<Login />} />

          {/* Route for the PasswordChange component */}
          <Route path="/password-change" element={<PasswordChange />} />

          {/* Route for the AdminLogin component */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Route for the AdminPanel component */}
          <Route path="/admin-panel" element={<AdminPanel />} />

          {/* Route for the MessagingApp component */}
          <Route path="/messages" element={<MessagingApp />} />
        </Routes>

        {/* Include the Footer component at the end of the layout */}
        <Footer />
      </div>
    </Router>
  );
}

// Export the App component as the default export
export default App;
