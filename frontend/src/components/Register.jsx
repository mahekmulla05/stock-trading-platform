import React, { useState, useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

/**
 * Register component provides the form for users to sign up for a new account.
 */
const Register = ({ setIsLoginBox }) => {

  // Local state for all registration fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');

  // Get the register function from GeneralContext
  const { register } = useContext(GeneralContext);

  /**
   * handleRegister is called when the 'Sign up' button is clicked.
   */
  const handleRegister = async (e) => {
    // Prevent the page from refreshing on form submit
    e.preventDefault();

    if (!username || !email || !password || !usertype) {
      return alert("Please fill in all fields and select a user type");
    }

    // Call the register function with our local form data
    await register({ username, email, password, usertype });
  }

  return (
    <form className="authForm" onSubmit={handleRegister}>
      <h2>Register</h2>

      {/* Username Input */}
      <div className="form-floating mb-3 authFormInputs">
        <input
          type="text"
          className="form-control"
          id="floatingUsername"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="floatingUsername">Username</label>
      </div>

      {/* Email Input */}
      <div className="form-floating mb-3 authFormInputs">
        <input
          type="email"
          className="form-control"
          id="floatingEmail"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="floatingEmail">Email address</label>
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

      {/* Dropdown to select User Type (Admin or Customer) */}
      <div className="mb-3 authFormInputs">
        <select
          className="form-select"
          value={usertype}
          onChange={(e) => setUsertype(e.target.value)}
          required
        >
          <option value="">Select User Type</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>
      </div>

      {/* Submit button */}
      <button type="submit" className="btn btn-primary">Sign up</button>

      {/* Switch back to Login form */}
      <p>
        Already registered? <span onClick={() => setIsLoginBox(true)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Login</span>
      </p>
    </form>
  )
}

export default Register;
