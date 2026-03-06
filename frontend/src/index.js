import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import GeneralContextProvider from './context/GeneralContext';
import axios from 'axios';
import API_URL from './config';

// Global Axios Interceptor for Frontend-Only Mocking
axios.interceptors.request.use(async (config) => {
  if (config.url.startsWith(API_URL)) {
    const endpoint = config.url.replace(API_URL, '');
    console.log(`[Mock API] Intercepted: ${config.method.toUpperCase()} ${endpoint}`);

    let data = null;
    const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
    const mockOrders = JSON.parse(localStorage.getItem("mockOrders") || "[]");
    const mockTransactions = JSON.parse(localStorage.getItem("mockTransactions") || "[]");
    const mockStocks = JSON.parse(localStorage.getItem("mockStocks") || "[]");

    // GET Requests
    if (config.method === 'get') {
      if (endpoint === '/fetch-users') data = mockUsers;
      else if (endpoint === '/transactions') data = mockTransactions;
      else if (endpoint === '/fetch-orders') data = mockOrders;
      else if (endpoint === '/fetch-stocks') data = mockStocks;
    }
    // POST Requests
    else if (config.method === 'post') {
      const body = config.data;

      if (endpoint === '/deposit' || endpoint === '/withdraw') {
        const userIdx = mockUsers.findIndex(u => u._id === body.user);
        if (userIdx > -1) {
          const amount = parseFloat(body.amount);
          if (endpoint === '/deposit') mockUsers[userIdx].balance += amount;
          else mockUsers[userIdx].balance -= amount;

          mockTransactions.push({
            _id: `t_${Date.now()}`,
            user: body.user,
            amount: amount,
            type: endpoint === '/deposit' ? 'deposit' : 'withdraw',
            paymentMode: body.paymentMode || 'Mock Payment',
            time: new Date().toISOString()
          });

          localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
          localStorage.setItem("mockTransactions", JSON.stringify(mockTransactions));
          data = { message: "Success" };
        }
      } else if (endpoint === '/buyStock' || endpoint === '/sellStock') {
        const userIdx = mockUsers.findIndex(u => u._id === body.user);
        if (userIdx > -1) {
          const totalPrice = parseFloat(body.totalPrice);
          const count = parseInt(body.count);

          if (endpoint === '/buyStock') {
            mockUsers[userIdx].balance -= totalPrice;
            // Add to portfolio
            const stockIdx = mockStocks.findIndex(s => s.user === body.user && s.symbol === body.symbol);
            if (stockIdx > -1) {
              mockStocks[stockIdx].count += count;
              mockStocks[stockIdx].totalPrice += totalPrice;
            } else {
              mockStocks.push({ ...body, _id: `s_${Date.now()}` });
            }
          } else {
            mockUsers[userIdx].balance += totalPrice;
            // Update portfolio
            const stockIdx = mockStocks.findIndex(s => s.user === body.user && s.symbol === body.symbol);
            if (stockIdx > -1) {
              mockStocks[stockIdx].count -= count;
              if (mockStocks[stockIdx].count <= 0) mockStocks.splice(stockIdx, 1);
            }
          }

          mockOrders.push({
            ...body,
            _id: `o_${Date.now()}`,
            orderStatus: 'Executed',
            time: new Date().toISOString()
          });

          localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
          localStorage.setItem("mockOrders", JSON.stringify(mockOrders));
          localStorage.setItem("mockStocks", JSON.stringify(mockStocks));
          data = { message: "Success" };
        }
      }
    }

    if (data !== null) {
      return Promise.reject({
        config,
        response: { data, status: 200, statusText: 'OK', headers: {}, config },
        isMock: true
      });
    }
  }
  return config;
}, (error) => Promise.reject(error));

// Catch the mock response in the response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isMock) return Promise.resolve(error.response);
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GeneralContextProvider>
      <App />
    </GeneralContextProvider>
  </BrowserRouter>
);
