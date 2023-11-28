import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordChange } from "../services/api.service";

// PasswordChange component
const PasswordChange = ({ username }) => {
  // State to manage old password, new password, confirm new password, and messages
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);

  // Access the navigate function
  const navigate = useNavigate();

  // Function to handle password change
  const handleChangePassword = async () => {
    try {
      // Check if the new passwords match
      if (newPassword !== confirmNewPassword) {
        setMessageType("error");
        setMessage("New passwords do not match.");
        return;
      }

      // Call the passwordChange function from your API
      const response = await passwordChange({
        username,
        oldPassword,
        newPassword,
      });

      // Update the message state with the response message
      setMessageType("success");
      setMessage(response.message);
    } catch (error) {
      console.error("Password Change Error:", error);
      // Check if the error message indicates incorrect old password
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "IncorrectOldPassword"
      ) {
        setMessageType("error");
        setMessage("Incorrect old password. Please try again.");
      } else {
        setMessageType("error");
        setMessage("Error changing password. Please try again.");
      }
    }
  };

  // Function to navigate back to the MessagingApp component
  const handleGoBack = () => {
    navigate(-1); // Equivalent to navigating back
  };

  // Render the component
  return (
    <div>
      <div className="container">
        <div className="wrapper-web-psw">
          {/* Header for the password change section */}
          <h2 className="web-h2-psw">Change your password</h2>
          <p className="psw-p">Once signed-out, please use your new password</p>
          <div className="wrapper-child-psw">
            {/* Input field for the old password */}
            <div>
              <label className="web-label-psw">Old Password:</label>
              <input
                className="web-input-psw"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="old password..."
              />
            </div>

            {/* Input field for the new password */}
            <div>
              <label className="web-label-psw">New Password:</label>
              <input
                className="web-input-psw"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="new password..."
              />
            </div>

            {/* Input field to confirm the new password */}
            <div>
              <label className="web-label-psw">Confirm Password:</label>
              <input
                className="web-input-psw"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="confirm password..."
              />
            </div>
          </div>

          {/* Button to trigger the password change */}
          <button className="web-btn" onClick={handleChangePassword}>
            Change Password
          </button>

          {/* Back button to go back to MessagingApp component */}
          <button className="web-btn" onClick={handleGoBack}>
            Back to Chat
          </button>

          <div className="s-e-message">
            {/* Display the message, with styling based on message type */}
            {message && (
              <div
                className={
                  messageType === "success"
                    ? "success-message"
                    : "error-message"
                }
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
