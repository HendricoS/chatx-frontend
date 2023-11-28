// Import React and the useNavigate hook from React Router
import React from "react";
import { useNavigate } from "react-router-dom";

// SignOut component
const SignOut = () => {
  // Get the navigate function from React Router
  const navigate = useNavigate();

  // Function to handle the sign-out process
  const handleSignOut = () => {
    // Clear user authentication state by removing the token from localStorage
    localStorage.removeItem("token"); // Store authentication token in localStorage

    // Navigate to the Login page after signing out
    navigate("/login");
  };

  // Render the sign-out button
  return (
    <button onClick={handleSignOut} className="btn btn-danger sign-out-btn">
      Sign Out
    </button>
  );
};

// Export the SignOut component
export default SignOut;
