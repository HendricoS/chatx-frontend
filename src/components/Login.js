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

// Login component
const Login = () => {
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
  };

  // Handler function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend for user login
      const response = await api.post("/login", formData);
      console.log(response.data.token); // Display token (for testing purposes)

      // Set the token, role, and username in session storage
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("role", response.data.role);
      sessionStorage.setItem("username", formData.username); // Store the username

      // Redirect to the messages page or admin panel based on role
      if (response.data.role === "admin") {
        navigate("/admin-login"); // Redirect to AdminLogin for admin users
      } else {
        navigate("/messages");
      }
    } catch (error) {
      console.error("Login Error:", error.message);

      // Handle login error, display appropriate error message
      if (error.response) {
        // Server responded with a status code outside the range of 2xx
        if (error.response.status === 401) {
          // Unauthorized (invalid credentials)
          setErrorMessage("Invalid username or password. Please try again.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage("No response from the server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  return (
    <div>
      {/* Links to other pages */}
      <div className="container">
        <div className="wrapper-web-nav">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-3">
              {/* Link to the Registration page */}
              <Link to="/">
                <span className="top-link">Registration</span>
              </Link>
            </div>
            <div className="col-lg-3">
              {/* Link to the Admin Login page */}
              <Link to="/admin-login">
                <span className="top-link">Admin Login</span>
              </Link>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
        {/* Login page information */}
        <div className="image-wrapper">
          {/* App logo */}
          <img
            className="web-logo"
            src="/images/chatx-logo.jpg"
            alt="app-logo"
          />
        </div>
        <div className="wrapper-web-log">
          <div className="wrapper-child-reg">
            {/* Login page header */}
            <h2 className="web-h2">Login Page</h2>
            {/* Login page description */}
            <p className="web-p">
              Please login by using your valid username (e.g. example@gmail.com)
            </p>
            <p className="web-p">Password can be changed once logged-in</p>
            {/* Display error message if there is one */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {/* Login form */}
            <form onSubmit={handleSubmit}>
              <div className="container">
                <div className="row">
                  {/* Username input field */}
                  <label className="web-label">Username:</label>
                  <div className="web-input-wrapper">
                    <input
                      className="web-input"
                      type="email"
                      name="username"
                      onChange={handleChange}
                      required
                      placeholder="example@gmail.com"
                    />
                  </div>
                  {/* Password input field */}
                  <label className="web-label">Password:</label>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
