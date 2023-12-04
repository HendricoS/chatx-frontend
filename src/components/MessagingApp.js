import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getMessages,
  sendMessage,
  deleteMessage,
} from "../services/api.service";
import SignOut from "./SignOut";

import AppLogo from "./appLogo";

// MessagingApp component
function MessagingApp() {
  // State to store messages and the new message being composed
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const [sending, setSending] = useState(false); // New sending state

  // useEffect to fetch messages when the component mounts and periodically
  useEffect(() => {
    // Function to fetch messages
    const fetchMessages = async () => {
      try {
        // Fetch messages from the server
        const messages = await getMessages();
        setMessages(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Initial fetch when the component mounts
    fetchMessages();

    // Periodic fetch every 2 seconds
    const intervalId = setInterval(() => fetchMessages(), 2000);

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // This effect runs once when the component mounts

  useEffect(() => {
    // Retrieve username from sessionStorage
    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  // Function to send a new message
  const handleSendMessage = async () => {
    try {
      setSending(true); // Set sending status to true

      // Send a new message to the server
      const response = await sendMessage({ text: newMessage });
      // Update the local state with the new message
      setMessages([...messages, response.newMessage]);
      // Clear the new message input field
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false); // Reset sending status
    }
  };

  // Function to delete a message
  const handleDeleteMessage = async (messageId) => {
    try {
      // Set loading to true when starting the deletion
      setLoading(true);
      // Delete the message on the server
      await deleteMessage(messageId);
      // Update the local state by filtering out the deleted message
      setMessages(messages.filter((message) => message._id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    } finally {
      // Set loading back to false when the deletion is complete (whether it succeeds or fails)
      setLoading(false);
    }
  };

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Render the component
  return (
    <div>
      <div className="container">
        <div className="wrapper-web-nav">
          <div className="row">
            {/* Links to other pages */}
            <div className="col-lg">
              {/* Link to the Change Password page */}
              <Link to="/password-change">
                <span className="top-link">Change Password</span>
              </Link>
            </div>
          </div>
        </div>
        {/* MessagingApp content */}
        <div className="wrapper-web-messages">
          <div className="wrapper-web-messages-child">
            <div className="image-wrapper">
              {/* App logo */}
              <AppLogo />
            </div>
            <div className="user-info">
              {/* Display the username */}
              <p className="user-p">
                Welcome, {capitalizeFirstLetter(username)}
              </p>
            </div>
            <div className="wrapper-msg-log">
              {/* Header for the message log */}
              <h2 className="msg-h2">ChatX - Message Log</h2>
              {/* Horizontal rule */}
              <hr className="msg-hr" />
              {/* Section for displaying messages */}
              <ul className="msg-ul">
                {messages.map((message) => (
                  <li className="msg-li" key={message._id}>
                    {/* Display the sender's name with the first letter capitalized */}
                    {capitalizeFirstLetter(
                      message.sender.replace("@gmail.com", "")
                    )}
                    : {message.text} {/* Button to delete the message */}
                    <div className="msg-delete-wrapper">
                      <button
                        className="msg-delete"
                        onClick={() => handleDeleteMessage(message._id)}
                        disabled={loading} // Disable the button when loading is true
                      >
                        X
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {/* Deleting messages */}
              <div className="dlt-msg">
                {loading ? "Deleting message..." : ""}
              </div>

              {/* Sending messages */}
              <div className="send-msg">
                {sending ? "Sending message..." : ""}
              </div>

              {/* Section for composing and sending a new message */}
              <div className="txt-area-wrapper">
                {/* Input field for typing a new message */}
                <textarea
                  className="txt-area"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Message"
                ></textarea>

                {/* Button to send the new message */}
                <button
                  className="txt-btn"
                  onClick={handleSendMessage}
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
            <div className="sign-out-wrapper">
              {/* SignOut component */}
              <SignOut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagingApp;
