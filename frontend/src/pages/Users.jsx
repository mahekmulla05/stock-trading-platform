import { useEffect, useState, useCallback } from 'react';
import '../styles/Users.css';
import axios from 'axios';
import API_URL from '../config';

/**
 * Users page allows admins to see a list of all registered customers.
 * It fetches the user list and filters out any admin accounts.
 */
const Users = () => {

  // We use the central API_URL from our config


  // 'users' stores the list of all registered account users
  const [users, setUsers] = useState([]);

  /**
   * fetchUsers gets the user database records from the backend.
   */
  const fetchUsers = useCallback(async () => {
    try {
      // Using axios directly with the full URL
      const response = await axios.get(`${API_URL}/fetch-users`);
      setUsers(response.data);
    } catch (err) {
      console.error("Users: Error fetching data:", err);
    }
  }, []);

  // Fetch users when the page opens
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="all-users-page">
      <h2>Registered Customers</h2>
      <div className="all-users">

        {/* We filter out 'admin' users so we only see the 'customers' */}
        {users.filter(user => user.usertype !== 'admin').map((user) => (
          <div className="user" key={user._id}>
            <p><b>User ID: </b>{user._id}</p>
            <p><b>Username: </b>{user.username}</p>
            <p><b>Email: </b>{user.email}</p>
            <p><b>Current Balance: </b>$ {user.balance}</p>
          </div>
        ))}

        {/* Show a message if no customers exist */}
        {users.filter(user => user.usertype !== 'admin').length === 0 && (
          <p>No customers registered yet.</p>
        )}

      </div>
    </div>
  );
};

export default Users;