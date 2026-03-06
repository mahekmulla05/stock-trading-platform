import React, { useEffect, useState } from 'react';
import '../styles/AllTransactions.css';
import axios from 'axios';
import API_URL from '../config';

/**
 * AllTransactions page allows admins to see a history of all 
 * cash deposits and withdrawals across the entire platform.
 */
const AllTransactions = () => {

  // Backend API location
  // We use the central API_URL from our config


  // 'transactions' stores every wallet event in the system
  const [transactions, setTransactions] = useState([]);

  /**
   * fetchTransactions gets the complete wallet history.
   */
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/transactions`);
      // Sort newest at the top
      setTransactions(response.data.reverse());
    } catch (err) {
      console.error("AllTransactions: Error fetching data:", err);
    }
  };

  // Fetch transactions when the page loads
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="all-transactions-page">
      <h2>Global Wallet Transactions</h2>
      <div className="all-transactions">

        {/* Loop through all wallet events */}
        {transactions.map((transaction, index) => (
          <div className="admin-transaction" key={index} >
            <span>
              <h6>Transaction ID</h6>
              <p>{transaction._id}</p>
            </span>
            <span>
              <h6>Customer ID</h6>
              <p>{transaction.user}</p>
            </span>
            <span>
              <h6>Amount</h6>
              <p style={{ color: transaction.type === "deposit" ? "green" : "red" }}>
                $ {transaction.amount}
              </p>
            </span>
            <span>
              <h6>Action</h6>
              <p>{transaction.type.toUpperCase()}</p>
            </span>
            <span>
              <h6>Payment Mode</h6>
              <p>{transaction.paymentMode || 'N/A'}</p>
            </span>
            <span>
              <h6>Execution Time</h6>
              <p>{transaction.time.slice(0, 16).replace('T', ' ')}</p>
            </span>
          </div>
        ))}

        {/* Message if no transactions found */}
        {transactions.length === 0 && (
          <p style={{ textAlign: 'center', width: '100%' }}>No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default AllTransactions;
