import React, { useEffect, useState, useCallback } from "react";
import "../styles/History.css";
import axios from "axios";
import API_URL from '../config';


/**
 * History page displays a log of all orders (Buy/Sell) placed by the user.
 */
const History = () => {

  // URL for our backend
  // We use the central API_URL from our config


  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('userId');


  /**
   * fetchOrders gets all order records and filters them for the current user.
   */
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/fetch-orders`);

      // Filter: only keep orders belonging to this user, and reverse to show newest first
      const userOrders = response.data
        .filter(order => order.user === userId)
        .reverse();

      setOrders(userOrders);
    } catch (err) {
      console.error("History: Error fetching orders:", err);
    }
  }, [userId]);

  // Load orders when page opens
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="historyPage">
      <div className="all-orders-container">
        <h2>Order History</h2>

        <div className="all-orders">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div className="all-orders-stock" key={order._id}>
                <span>
                  <h5>Stock Name</h5>
                  <p>{order.name}</p>
                </span>
                <span>
                  <h5>Symbol</h5>
                  <p>{order.symbol}</p>
                </span>
                <span>
                  <h5>Action</h5>
                  <p style={{ fontWeight: 'bold' }}>{order.orderType.toUpperCase()}</p>
                </span>
                <span>
                  <h5>Quantity</h5>
                  <p>{order.count}</p>
                </span>
                <span>
                  <h5>Price</h5>
                  <p>$ {order.price}</p>
                </span>
                <span>
                  <h5>Total Value</h5>
                  <p>$ {order.totalPrice}</p>
                </span>
                <span>
                  <h5>Status</h5>
                  <p style={{ color: "green", fontWeight: 'bold' }}>{order.orderStatus}</p>
                </span>
              </div>
            ))
          ) : (
            <div className="no-orders text-center">
              <p>No orders found. Start trading to see your history here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
