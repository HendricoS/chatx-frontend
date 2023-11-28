import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Axios instance for API calls
const api = axios.create({
  baseURL: "https://github.com/HendricoS/chatx-app.git", // Backend URL
});

// Registration component
const Registration = () => {
  // React Router's navigate function
  const navigate = useNavigate();

  // State to manage form data (username and password)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // State to manage error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the password meets the minimum length requirement
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    // Check if the username contains "@gmail.com"
    if (!formData.username.includes("@gmail.com")) {
      setErrorMessage("Please use a valid Gmail address.");
      return;
    }

    try {
      // Send registration request to the backend
      const response = await api.post("/register", formData);
      console.log(response.data.message); // Display registration success message
      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error.message);

      // Check if the error is due to an existing username
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "UsernameExists"
      ) {
        setErrorMessage(
          "Username already exists. Please choose a different username."
        );
      } else {
        // Handle other registration errors, show an error message, etc.
        setErrorMessage("Error during registration. Username already exists.");
      }
    }
  };

  // Render the component
  return (
    <div>
      {/* Links to other pages */}
      <div className="container">
        <div className="wrapper-web-nav">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-3">
              {/* Link to the user login page */}
              <Link to="/login">
                <span className="top-link">User Login</span>
              </Link>
            </div>
            <div className="col-lg-3">
              {/* Link to the admin login page */}
              <Link to="/admin-login">
                <span className="top-link">Admin Login</span>
              </Link>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
        {/* Registration page information */}
        <div className="image-wrapper">
          {/* App logo */}
          <img
            className="web-logo"
            src={process.env.PUBLIC_URL + "/images/chatx-logo.jpg"}
            alt="app-logo"
          />
        </div>
        <div className="wrapper-web-reg">
          <div className="wrapper-child-reg">
            {/* Header for the registration section */}
            <h2 className="web-h2">Registration</h2>
            {/* Instructions for registration */}
            <p className="web-p">
              Please register using a valid username (e.g. example@gmail.com)
            </p>
            {/* Display error message, if any */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {/* Registration form */}
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
                <div className="row">
                  <div className="col-lg">
                    {/* Submit button for registration */}
                    <button className="web-btn" type="submit">
                      Register
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

export default Registration;
