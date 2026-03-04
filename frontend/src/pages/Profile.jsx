import React, { useEffect, useState, useCallback } from 'react';
import '../styles/Profile.css';
import axios from 'axios';
import API_URL from '../config';

/**
 * Profile page handles user data, wallet transactions (deposit/withdraw),
 * and transaction history.
 */
const Profile = () => {

  // Backend API location
  // We use the central API_URL from our config


  const userId = localStorage.getItem('userId');
  const userEmail = localStorage.getItem('email');
  const userName = localStorage.getItem('username');

  // State management
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [actionType, setActionType] = useState('history'); // history, deposit, or withdraw
  const [amount, setAmount] = useState(0);


  /**
   * fetchUserProfile gets the current account balance.
   */
  const fetchUserProfile = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/fetch-users`);
      const currentUser = res.data.find(u => u._id === userId);
      if (currentUser) {
        setBalance(currentUser.balance);
      }
    } catch (err) {
      console.error("Profile: Error fetching user data:", err);
    }
  }, [userId]);

  /**
   * handleDeposit adds money to the wallet.
   */
  const handleDeposit = async (e) => {
    e.preventDefault();
    if (amount <= 0) return alert("Please enter a valid amount");

    try {
      await axios.post(`${API_URL}/deposit`, {
        user: userId,
        amount: parseFloat(amount),
        paymentMode: "Mock Payment"
      });
      alert("Deposit successful!");
      setAmount(0);
      setActionType('history');
      fetchUserProfile();
      fetchTransactions();
    } catch (err) {
      console.error("Deposit Error:", err);
      alert("Deposit failed. Check your connection.");
    }
  };

  /**
   * handleWithdraw takes money out of the wallet.
   */
  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (amount <= 0) return alert("Please enter a valid amount");
    if (amount > balance) return alert("Insufficient balance!");

    try {
      await axios.post(`${API_URL}/withdraw`, {
        user: userId,
        amount: parseFloat(amount)
      });
      alert("Withdrawal successful!");
      setAmount(0);
      setActionType('history');
      fetchUserProfile();
      fetchTransactions();
    } catch (err) {
      console.error("Withdrawal Error:", err);
      alert("Withdrawal failed. Check your balance or connection.");
    }
  };

  /**
   * fetchTransactions gets the history of user's wallet events.
   */
  const fetchTransactions = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/transactions`);
      // Filter activities for THIS user only, and show newest first
      const userActivities = res.data.filter(t => t.user === userId).reverse();
      setTransactions(userActivities);
    } catch (err) {
      console.error("Profile: Error fetching transactions:", err);
    }
  }, [userId]);

  // Load user data on mount
  useEffect(() => {
    fetchUserProfile();
    fetchTransactions();
  }, [fetchUserProfile, fetchTransactions]);

  return (
    <div className="profilePage">

      {/* User Information Summary */}
      <div className="profileInfo">
        <div className="profileCard">
          <h3>Welcome, {userName}!</h3>
          <p><b>Email:</b> {userEmail}</p>
          <p><b>Account ID:</b> {userId}</p>
          <div className="balanceBox">
            <h4>Current Balance</h4>
            <h2>$ {Number(balance || 0).toFixed(2)}</h2>
          </div>
        </div>
      </div>

      {/* Wallet Controls & History */}
      <div className="profileActions">
        <div className="actionTabs">
          <button className={actionType === 'history' ? 'active' : ''} onClick={() => setActionType('history')}>History</button>
          <button className={actionType === 'deposit' ? 'active' : ''} onClick={() => setActionType('deposit')}>Add Funds</button>
          <button className={actionType === 'withdraw' ? 'active' : ''} onClick={() => setActionType('withdraw')}>Withdraw</button>
        </div>

        <div className="actionBody">
          {actionType === 'history' && (
            <div className="transactionList">
              <h4>Recent Transactions</h4>
              {transactions.length === 0 ? <p>No transactions yet.</p> : (
                transactions.map((t, i) => (
                  <div key={i} className={`transactionItem ${t.type}`}>
                    <span>{t.type.toUpperCase()}</span>
                    <span>$ {Number(t.amount || 0).toFixed(2)}</span>
                    <small>{t.time ? t.time.slice(0, 10) : 'N/A'}</small>
                  </div>
                ))
              )}
            </div>
          )}

          {actionType === 'deposit' && (
            <form onSubmit={handleDeposit} className="walletForm">
              <h4>Add Funds</h4>
              <input type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              <button type="submit" className="btn-success">Confirm Deposit</button>
            </form>
          )}

          {actionType === 'withdraw' && (
            <form onSubmit={handleWithdraw} className="walletForm">
              <h4>Withdraw Money</h4>
              <input type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              <button type="submit" className="btn-danger">Confirm Withdrawal</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
