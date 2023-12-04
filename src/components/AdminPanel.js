import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api.service"; // Import the functions to fetch users and delete a user
import SignOut from "./SignOut";

const AdminPanel = () => {
  // State to store the list of users
  const [users, setUsers] = useState(null);

  // State to manage the deleting user status
  const [deletingUser, setDeletingUser] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Call the getUsers function to fetch the list of users
        const userList = await getUsers();
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Function to handle the deletion of a user
  const handleDeleteUser = async (userId) => {
    try {
      console.log("Deleting user:", userId);
      // Log token and user role for testing purposes
      console.log("Token:", sessionStorage.getItem("token"));
      console.log("User Role:", sessionStorage.getItem("role"));

      // Set a state to indicate deleting user
      setDeletingUser(true);

      // Call the deleteUser function to delete a user
      await deleteUser(userId);

      // Update the user list after successful deletion
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeletingUser(false); // Reset deleting user status
    }
  };

  return (
    <div>
      <div className="container admin-panel-main-wrapper">
        {/* Admin Panel header */}
        <h2 className="web-h2-admin">Admin Panel</h2>
        <p className="admin-p">
          Note! Once an account is deleted, they will no longer be able to log
          in.
        </p>
        <div className="admin-panel-child-wrapper">
          {/* Display user list if available */}
          {users ? (
            <ul className="ul-admin">
              {/* Map through the list of users and display user information */}
              {users.map((user) => (
                <li className="li-admin" key={user._id}>
                  {user.username}
                  {/* Add a button to delete the user */}
                  <button
                    className="button-admin"
                    onClick={() => handleDeleteUser(user._id)}
                    disabled={deletingUser}
                  >
                    Delete Account
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            // Display loading message if user list is still loading
            <p style={{ color: "#fff" }}>Loading user list...</p>
          )}
          {/* Deleting user message */}
          <div className="dlt-msg">
            {deletingUser ? "Deleting User..." : ""}
          </div>

          <div className="sign-out-wrapper">
            {/* Sign out component */}
            <SignOut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
