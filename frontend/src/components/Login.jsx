import React, { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext';

const Login = ({setIsLoginBox}) => {

  const {setEmail, setPassword, login} = useContext(GeneralContext);

  const handleLogin = async (e) =>{
    e.preventDefault();
    await login();
  }
  return (
    <form className="authForm">
        <h2>Login</h2>
        <div className="form-floating mb-3 authFormInputs">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" 
                                                                  onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="floatingInput">Email address</label>
        </div>
            <div className="form-floating mb-3 authFormInputs">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" 
                                                                  onChange={(e) => setPassword(e.target.value)} /> 
            <label htmlFor="floatingPassword">Password</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleLogin}>Sign in</button>

        <p>Not registered? <span onClick={()=> setIsLoginBox(false)}>Register</span></p>
    </form>
  )
}
export default Login





// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { GeneralContext } from "../context/GeneralContext";

// /**

// * Login component provides the form for users to sign in.
//   */
//   const Login = ({ setIsLoginBox }) => {

// const navigate = useNavigate();

// // Local state for form inputs
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");

// // Get login function from context
// const { login } = useContext(GeneralContext);

// /**

// * Handles login form submission
//   */
//   const handleLogin = async (e) => {
//   e.preventDefault();

// if (!email || !password) {

//   alert("Please fill in all fields");
//   return;
// }

// try {

//   // call context login
//   const res = await login({ email, password });

//   // if login success navigate
//   if (res?.usertype === "admin") {
//     navigate("/admin");
//   } else if (res?.usertype === "customer") {
//     navigate("/home");
//   }

// } catch (error) {
//   console.error("Login error:", error);
//   alert("Login failed. Please check your credentials.");
// }

// };

// return ( <form className="authForm" onSubmit={handleLogin}> <h2>Login</h2>

//   {/* Email Input */}
//   <div className="form-floating mb-3 authFormInputs">
//     <input
//       type="email"
//       className="form-control"
//       placeholder="name@example.com"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//       required
//     />
//     <label>Email address</label>
//   </div>

//   {/* Password Input */}
//   <div className="form-floating mb-3 authFormInputs">
//     <input
//       type="password"
//       className="form-control"
//       placeholder="Password"
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//       required
//     />
//     <label>Password</label>
//   </div>

//   {/* Submit Button */}
//   <button type="submit" className="btn btn-primary">
//     Sign in
//   </button>


//   <p>
//     Not registered?{" "}
//     <span
//       onClick={() => setIsLoginBox(false)}
//       style={{
//         cursor: "pointer",
//         color: "blue",
//         textDecoration: "underline",
//       }}
//     >
//       Register
//     </span>
//   </p>
// </form>
// );
// };

// export default Login;
