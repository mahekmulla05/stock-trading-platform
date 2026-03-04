import React, { useState, useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

/**
 * Login component provides the form for users to sign in.
 */
const Login = ({ setIsLoginBox }) => {

  // Local state for the form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get the login function from GeneralContext
  const { login } = useContext(GeneralContext);

  /**
   * handleLogin is called when the 'Sign in' button is clicked.
   */
  const handleLogin = async (e) => {
    // Prevent browser refresh
    e.preventDefault();

    if (!email || !password) {
      return alert("Please fill in all fields");
    }

    // Call the login function with our local form data
    await login({ email, password });
  }

  return (
    <form className="authForm" onSubmit={handleLogin}>
      <h2>Login</h2>

      {/* Email Input */}
      <div className="form-floating mb-3 authFormInputs">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>

      {/* Password Input */}
      <div className="form-floating mb-3 authFormInputs">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      {/* Submit button */}
      <button type="submit" className="btn btn-primary">Sign in</button>

      {/* Switch to Register form */}
      <p>
        Not registered? <span onClick={() => setIsLoginBox(false)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Register</span>
      </p>
    </form>
  )
}

export default Login;
