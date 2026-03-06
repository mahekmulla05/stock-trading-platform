import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// The Context API allows us to share data (like user info) across the whole app
export const GeneralContext = createContext();

/**
 * GeneralContextProvider manages the application's global state,
 * specifically user authentication (login, registration, logout).
 */
const GeneralContextProvider = ({ children }) => {

  // We use the central API_URL from our config


  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Initialize mock data on load
  useEffect(() => {
    const existingUsers = localStorage.getItem("mockUsers");
    if (!existingUsers) {
      const initialUsers = [
        {
          _id: "mock_admin_1",
          username: "AdminUser",
          email: "admin@test.com",
          password: "admin",
          usertype: "admin",
          balance: 0
        },
        {
          _id: "mock_user_1",
          username: "JohnDoe",
          email: "john@test.com",
          password: "password123",
          usertype: "customer",
          balance: 1500.50
        },
        {
          _id: "mock_user_2",
          username: "JaneSmith",
          email: "jane@test.com",
          password: "password123",
          usertype: "customer",
          balance: 2400.00
        }
      ];
      localStorage.setItem("mockUsers", JSON.stringify(initialUsers));
    }
  }, []);

  /**
   * login handles the user sign-in process (Mock).
   */
  const login = async (loginInputs) => {
    try {
      // Simulation of network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const { email, password } = loginInputs;
      const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
      const userFound = mockUsers.find(u => u.email === email && u.password === password);

      if (!userFound) {
        throw new Error("Invalid email or password");
      }

      // Store user details in localStorage so they stay logged in if the page refreshes
      localStorage.setItem("userId", userFound._id);
      localStorage.setItem("userType", userFound.usertype);
      localStorage.setItem("username", userFound.username);
      localStorage.setItem("email", userFound.email);

      setUser(userFound);
      navigate("/home");
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.message || "Login failed! Please check your credentials.");
    }
  };

  /**
   * register handles the creation of a new user account (Mock).
   */
  const register = async (inputs) => {
    try {
      // Simulation of network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const { username, email, password, usertype } = inputs;
      const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");

      if (mockUsers.find(u => u.email === email)) {
        throw new Error("Registration failed! Try a different email.");
      }

      const newUser = {
        _id: Date.now().toString(),
        username,
        email,
        password,
        usertype: usertype || 'customer',
        balance: 5000 // Default balance for new mock users
      };

      mockUsers.push(newUser);
      localStorage.setItem("mockUsers", JSON.stringify(mockUsers));

      // After registering, we automatically log them in
      localStorage.setItem("userId", newUser._id);
      localStorage.setItem("userType", newUser.usertype);
      localStorage.setItem("username", newUser.username);
      localStorage.setItem("email", newUser.email);

      setUser(newUser);
      navigate("/home");
    } catch (err) {
      console.error("Registration Error:", err);
      alert(err.message || "Registration failed! Try a different email.");
    }
  };

  /**
   * logout clears all user data (Mock).
   */
  const logout = async () => {
    // Always clear local data and redirect
    const mockUsers = localStorage.getItem("mockUsers"); // Keep the "database"
    localStorage.clear();
    if (mockUsers) localStorage.setItem("mockUsers", mockUsers); // Restore the "database"
    setUser(null);
    navigate("/");
  };

  return (
    <GeneralContext.Provider value={{ login, register, logout, user, setUser }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
