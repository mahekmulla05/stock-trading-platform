import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import '../styles/Admin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * Admin dashboard page.
 * Admins can see trending stocks and search through the global watchlist.
 */
const Admin = () => {

  const [trendingStocks, setTrendingStocks] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // API settings for Trending Stocks
  const optionsTrending = {
    method: 'GET',
    url: 'https://mboum-finance.p.rapidapi.com/co/collections/most_actives',
    params: { start: '0' },
    headers: {
      'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
      'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
    }
  };

  // API settings for Global Watchlist (NASDAQ stocks)
  const optionsAll = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/stocks',
    params: { exchange: 'NASDAQ', format: 'json' },
    headers: {
      'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
      'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
    }
  };


  /**
   * fetchTrending gets the 'Most Active' stocks today.
   */
  const fetchTrending = async () => {
    try {
      const response = await axios.request(optionsTrending);
      setTrendingStocks(response.data.body || []);
    } catch (error) {
      console.error("Admin: Error fetching trending stocks:", error);
    }
  };

  /**
   * fetchAllStocks gets the full list of tradable symbols.
   */
  const fetchAllStocks = async () => {
    try {
      const response = await axios.request(optionsAll);
      setAllStocks(response.data.data || []);
    } catch (error) {
      console.error("Admin: Error fetching watchlist:", error);
    }
  };

  // Fetch all necessary data when the admin logs in
  useEffect(() => {
    fetchTrending();
    fetchAllStocks();
  }, []);

  /**
   * filteredStocks applies the search filter to the watchlist.
   */
  const filteredStocks = allStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
    stock.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="adminPage">

      {/* SECTION 1: TRENDING STOCKS */}
      <div className="trending-stocks-container">
        <h2>Trending Stocks</h2>
        <div className="trending-stocks">
          {trendingStocks.length === 0 ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            trendingStocks.map((stock, index) => (
              <div
                className="trending-stock"
                key={`${stock.symbol}-${index}`}
                onClick={() => navigate(`/admin-stock/${stock.symbol}`)}
              >
                <span>
                  <h5>Stock Name</h5>
                  <p>{stock.shortName}</p>
                </span>
                <span>
                  <h5>Symbol</h5>
                  <p>{stock.symbol}</p>
                </span>
                <span>
                  <h5>Price Info</h5>
                  <p style={{ color: stock.regularMarketChangePercent > 0 ? "green" : "red" }}>
                    $ {Number(stock.regularMarketOpen || 0).toFixed(2)} ({Number(stock.regularMarketChangePercent || 0).toFixed(2)}%)
                  </p>
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SECTION 2: WATCHLIST (SEARCHABLE) */}
      <div className="all-stocks-container">
        <div className="all-stocks-container-head">
          <h2>Global Watchlist</h2>
          <div className="all-stocks-container-search">
            <input
              type="text"
              placeholder='Search Symbol or Name...'
              onChange={(e) => setSearch(e.target.value)}
            />
            <BiSearch id='searchIcon' />
          </div>
        </div>

        <div className="all-stocks">
          {allStocks.length === 0 ? (
            <div className="loading-spinner">Loading Watchlist...</div>
          ) : (
            filteredStocks.slice(0, 100).map((stock, index) => ( // Limiting to top 100 for performance
              <div className="all-stocks-stock" key={index}>
                <h6>{stock.exchange}</h6>
                <span>
                  <h5>Stock Name</h5>
                  <p>{stock.name}</p>
                </span>
                <span>
                  <h5>Symbol</h5>
                  <p>{stock.symbol}</p>
                </span>
                <span>
                  <h5>Type</h5>
                  <p>{stock.type}</p>
                </span>
                <button
                  className='btn btn-primary'
                  onClick={() => navigate(`/admin-stock/${stock.symbol}`)}
                >
                  View Chart
                </button>
              </div>
            ))
          )}

          {filteredStocks.length === 0 && allStocks.length > 0 && (
            <p style={{ textAlign: 'center', width: '100%' }}>No results found for "{search}"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
