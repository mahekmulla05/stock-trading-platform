import React, { useEffect, useState, useCallback } from "react";
import "../styles/AllOrders.css";
import axios from "axios";
import API_URL from '../config';


/**
 * AllOrders page allows admins to oversee all stock orders 
 * placed by every user on the platform.
 */
const AllOrders = () => {

  // Backend API location
  // We use the central API_URL from our config


  // 'orders' stores the master list of all purchase/sell events
  const [orders, setOrders] = useState([]);


  /**
   * fetchOrders gets the complete order list from the server.
   */
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/fetch-orders`);
      // Sort so newest transactions are at the top
      setOrders(response.data.reverse());
    } catch (err) {
      console.error("AllOrders: Error fetching global orders:", err);
    }
  }, []);

  // Load all orders when the admin navigates here
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="orderPage">
      <div className="all-orders-container">
        <div className="all-orders-container-head">
          <h2>Global Orders (Admin View)</h2>
        </div>

        <div className="all-orders">
          {/* Loop through every order in the system */}
          {orders.map((order) => (
            <div className="all-orders-stock" key={order._id}>
              <span>
                <h5>Customer ID</h5>
                <p>{order.user}</p>
              </span>
              <span>
                <h5>Stock Type</h5>
                <p>{order.stockType}</p>
              </span>
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
                <h5>Execution Price</h5>
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
          ))}

          {/* Show a message if no orders have ever been placed */}
          {orders.length === 0 && (
            <p style={{ textAlign: 'center', width: '100%' }}>No orders have been placed on the platform yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
