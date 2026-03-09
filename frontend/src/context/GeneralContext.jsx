import React, { createContext, useState } from "react";
import axiosInstance from "../components/axiosInstance";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");

  const inputs = { username, email, usertype, password };

  const navigate = useNavigate();

const login = async () => {
  try {
    const loginInputs = { email, password };
    console.log("Login inputs:", loginInputs);

    const res = await axiosInstance.post("/login", loginInputs);

    localStorage.setItem("userId", res.data._id);
    localStorage.setItem("userType", res.data.usertype);
    localStorage.setItem("username", res.data.username);
    localStorage.setItem("email", res.data.email);
    localStorage.setItem("balance", res.data.balance);

    if (res.data.usertype === "customer") {
      navigate("/home");
    } else if (res.data.usertype === "admin") {
      navigate("/admin");
    }
  } catch (err) {
    console.error("Login failed:", err);
    alert("Login failed. Please check credentials.");
  }
};

const register = async () => {
  try {
    const res = await axiosInstance.post("/register", inputs);

    localStorage.setItem("userId", res.data._id);
    localStorage.setItem("userType", res.data.usertype);
    localStorage.setItem("username", res.data.username);
    localStorage.setItem("email", res.data.email);
    localStorage.setItem("balance", res.data.balance);

    if (res.data.usertype === "customer") {
      navigate("/home");
    } else if (res.data.usertype === "admin") {
      navigate("/admin");
    }
  } catch (err) {
    // This will now log the actual error message from the server
    console.error("Registration Error Details:", err.response?.data || err.message);
    alert("Registration failed: " + (err.response?.data?.message || "Internal Server Error"));
  }
}; // Closed properly here


//   const register = async () => {
//   try {
//     const res = await axiosInstance.post("/register", inputs);

//     localStorage.setItem("userId", res.data._id);
//     localStorage.setItem("userType", res.data.usertype);
//     localStorage.setItem("username", res.data.username);
//     localStorage.setItem("email", res.data.email);
//     localStorage.setItem("balance", res.data.balance);

//     if (res.data.usertype === "customer") {
//       navigate("/home");
//     } else if (res.data.usertype === "admin") {
//       navigate("/admin");
//     } 
//    } catch (err) {
//   console.error("Registration failed:", err.response?.data || err.message);
//   alert("Registration failed");
//   }
// };


  const logout = async () => {
    axiosInstance
      .post("/logout")
      .then(() => {
        localStorage.clear();
        for (let key in localStorage) {
          if (localStorage.hasOwnProperty(key)) {
            localStorage.removeItem(key);
          }
        }

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <GeneralContext.Provider
      value={{
        login,
        register,
        logout,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        usertype,
        setUsertype,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;




// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export const GeneralContext = createContext();

// const API_URL = "http://localhost:6001";

// const GeneralContextProvider = ({ children }) => {

//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Restore session
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");

//     if (storedUser && storedUser !== "undefined") {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (err) {
//         console.error("User parse error", err);
//         localStorage.removeItem("user");
//       }
//     }
//   }, []);

//   // LOGIN
//   const login = async (loginInputs) => {
//     try {

//       const res = await axios.post(`${API_URL}/api/users/login`, loginInputs);

//       const userData = res.data.user || res.data;

//       localStorage.setItem("user", JSON.stringify(userData));
//       localStorage.setItem("userType", userData.usertype);

//       setUser(userData);

//       if (userData.usertype === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/home");
//       }

//       return userData;

//     } catch (err) {

//       console.error("Login Error:", err);

//       alert(
//         err.response?.data?.message ||
//         "Login failed! Please check credentials."
//       );
//     }
//   };

//   // REGISTER
//   const register = async (inputs) => {
//     try {

//       const res = await axios.post(`${API_URL}/api/users/register`, inputs);

//       const userData = res.data.user;

//       localStorage.setItem("user", JSON.stringify(userData));
//       localStorage.setItem("userType", userData.usertype);

//       setUser(userData);

//       navigate("/home");

//     } catch (err) {

//       console.error("Registration Error:", err);

//       alert(
//         err.response?.data?.message ||
//         "Registration failed!"
//       );
//     }
//   };

//   // LOGOUT
//   const logout = () => {

//     localStorage.removeItem("user");
//     localStorage.removeItem("userType");

//     setUser(null);

//     navigate("/");
//   };

//   return (
//     <GeneralContext.Provider
//       value={{
//         user,
//         setUser,
//         login,
//         register,
//         logout
//       }}
//     >
//       {children}
//     </GeneralContext.Provider>
//   );
// };

// export default GeneralContextProvider;