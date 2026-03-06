import React, { useEffect, useState, useCallback } from 'react';
import '../styles/Portfolio.css';
import axios from 'axios';
import API_URL from '../config';

/**
 * Portfolio page displays the stocks that the logged-in user currently owns.
 */
const Portfolio = () => {

  // URL for our backend
  // We use the central API_URL from our config


  const [portfolio, setPortfolio] = useState([]);
  const userId = localStorage.getItem('userId');


  /**
   * fetchPortfolio gets all stock records and filters them for the current user.
   */
  const fetchPortfolio = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/fetch-stocks`);

      // Filter list: only keep stocks where the 'user' ID matches ours
      const userStocks = response.data.filter(stock => stock.user === userId);
      setPortfolio(userStocks);
    } catch (err) {
      console.error("Portfolio: Error fetching data:", err);
    }
  }, [userId]);

  // Load portfolio data when page opens
  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return (
    <div className="portfolioPage">
      <div className="portfolio-container">
        <h2>My Stock Portfolio</h2>

        <div className="portfolio-stocks">
          {portfolio.length > 0 ? (
            portfolio.map((stock, index) => (
              <div className="portfolio-stock" key={index}>
                <span>
                  <h5>Stock Name</h5>
                  <p>{stock.name}</p>
                </span>
                <span>
                  <h5>Symbol</h5>
                  <p>{stock.symbol}</p>
                </span>
                <span>
                  <h5>Average Price</h5>
                  <p>$ {stock.price}</p>
                </span>
                <span>
                  <h5>Quantity Owned</h5>
                  <p>{stock.count}</p>
                </span>
                <span>
                  <h5>Total Investment</h5>
                  <p>$ {stock.totalPrice}</p>
                </span>
              </div>
            ))
          ) : (
            <div className="no-stocks">
              <p>You don't own any stocks yet. Go to the Home page to start trading!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
