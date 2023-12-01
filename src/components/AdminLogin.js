import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Create an instance of axios with the base URL for the backend
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL ||
    "https://chatx-backend-8tb3.onrender.com" ||
    "http://localhost:5000",
});

const AdminLogin = () => {
  // React hook for navigation
  const navigate = useNavigate();

  // State to manage form data (username and password)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // State to manage error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Handler function for input changes in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear previous error messages when the user starts typing
    setErrorMessage("");
  };

  // Handler function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the username contains "@gmail.com"
    if (!formData.username.includes("@gmail.com")) {
      setErrorMessage("Please enter a valid Gmail account.");
      return;
    }

    // Check if the password meets the minimum length requirement
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    try {
      // Send a POST request to the backend for admin login
      const response = await api.post("/admin-login", formData);

      // Display the token received from the backend (for testing purposes)
      console.log(response.data.token);

      // Set the token, role, and username in session storage
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("role", response.data.role);
      sessionStorage.setItem("username", formData.username); // Store the username

      // Redirect to the admin panel after successful login
      navigate("/admin-panel");
    } catch (error) {
      console.error("Admin Login Error:", error.message);
      // Handle login error, show an error message, etc.
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="wrapper-admin">
          <div className="wrapper-web-nav">
            {/* Link to the user login page */}
            <Link to="/login">
              <span className="top-link">User Login</span>
            </Link>
          </div>

          {/* Admin login page */}
          <h2 className="web-h2-admin">Admin Login</h2>
          <p className="admin-p">Welcome, please enter username and password</p>
          {/* Form for admin login */}
          <form onSubmit={handleSubmit}>
            <div className="container wrapper-admin-child">
              <div className="row">
                {/* Username input field */}
                <label className="web-label-admin">Username:</label>
                <div className="web-input-wrapper">
                  <input
                    className="web-input-admin"
                    type="email"
                    name="username"
                    onChange={handleChange}
                    required
                    placeholder="admin@example.com"
                  />
                </div>
                {/* Password input field */}
                <label className="web-label-admin">Password:</label>
                <div className="web-input-wrapper">
                  <input
                    className="web-input"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    required
                    placeholder="password..."
                  />
                </div>
              </div>
              {/* Submit button */}
              <div className="row">
                <div className="col-lg">
                  <button className="web-btn" type="submit">
                    Login
                  </button>
                </div>
              </div>
              {/* Display error message, if any */}
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
