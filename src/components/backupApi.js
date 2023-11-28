import axios from "axios";

// Create an instance of axios with the base URL for the backend
const api = axios.create({
  baseURL: "https://github.com/HendricoS/chatx-app.git", // Backend URL
});

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to log in a user
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/login", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get admin data
export const getAdminData = async () => {
  try {
    const response = await api.get("/admin-data");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to send a message
export const sendMessage = async (messageData) => {
  try {
    const token = getToken();
    const response = await api.post("/messages", messageData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get messages
export const getMessages = async () => {
  try {
    const token = getToken();
    const response = await api.get("/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to delete a message
export const deleteMessage = async (messageId) => {
  try {
    const token = getToken();
    const response = await api.delete(`/messages/${messageId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to change password
export const passwordChange = async ({ oldPassword, newPassword }) => {
  try {
    const token = getToken();
    const response = await api.post(
      "/password-change",
      { oldPassword, newPassword },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Helper function to get the token from session storage
const getToken = () => {
  return sessionStorage.getItem("token");
};

///////////////////////////////////
// Admin Routes (api)

// Function to get all users (requires admin privileges)
export const getUsers = async () => {
  try {
    const response = await api.get("/admin/users", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete a user (requires admin privileges)
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Object containing all the exported API functions
const apis = {
  registerUser,
  loginUser,
  sendMessage,
  getMessages,
  deleteMessage,
  passwordChange,
  getUsers,
  deleteUser,
};

export default apis;
