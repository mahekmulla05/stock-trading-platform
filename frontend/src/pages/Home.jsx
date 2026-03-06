import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

/**
 * Home page where users can see trending stocks and search for new ones.
 */
const Home = () => {

  // 'useState' is used to store data that will change over time.
  const [trendingStocks, setTrendingStocks] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  /**
   * Fetches the most active stocks from an external API.
   */
  const fetchTrending = async () => {
    const optionsTrending = {
      method: 'GET',
      url: 'https://mboum-finance.p.rapidapi.com/co/collections/most_actives',
      params: { start: '0' },
      headers: {
        'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
        'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(optionsTrending);
      setTrendingStocks(response.data.body);
    } catch (error) {
      console.error("Error fetching trending stocks:", error);
    }
  };

  /**
   * Fetches all available stocks from the NASDAQ exchange.
   */
  const fetchAllStocks = async () => {
    const optionsAll = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/stocks',
      params: {
        exchange: 'NASDAQ',
        format: 'json'
      },
      headers: {
        'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(optionsAll);
      setAllStocks(response.data.data);
    } catch (error) {
      console.error("Error fetching all stocks:", error);
    }
  };

  // 'useEffect' runs code when the component first appears on the screen.
  useEffect(() => {
    fetchTrending();
    fetchAllStocks();
  }, []);

  return (
    <div className="homePage">

      {/* Section 1: Trending Stocks */}
      <div className="trending-stocks-container">
        <h2>Trending stocks</h2>
        <div className="trending-stocks">
          {/* Show a loading spinner if the data hasn't arrived yet */}
          {trendingStocks.length === 0 && <div className="loading-spinner"></div>}

          {/* Map through the array and create a div for each stock */}
          {trendingStocks.map((stock, index) => (
            <div className="trending-stock" key={stock.symbol + index} onClick={() => navigate(`/stock/${stock.symbol}`)}>
              <span>
                <h5>Stock name</h5>
                <p>{stock.shortName}</p>
              </span>
              <span>
                <h5>Symbol</h5>
                <p>{stock.symbol}</p>
              </span>
              <span>
                <h5>Price</h5>
                <p style={stock.regularMarketChangePercent > 0 ? { color: "green" } : { color: "red" }}>
                  $ {Number(stock.regularMarketOpen || 0).toFixed(2)} ({Number(stock.regularMarketChangePercent || 0).toFixed(2)}%)
                </p>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Watchlist / Search */}
      <div className="all-stocks-container">
        <div className="all-stocks-container-head">
          <h2>Watchlist</h2>
          <div className="all-stocks-container-search">
            {/* When the user types, it updates the 'search' state */}
            <input
              type="text"
              placeholder='Enter Stock Symbol....'
              onChange={(e) => setSearch(e.target.value)}
            />
            <BiSearch id='searchIcon' />
          </div>
        </div>

        <div className="all-stocks">
          {allStocks.length === 0 && <div className="loading-spinner"></div>}

          {/* If search is empty, show all. Otherwise, filter and show. */}
          {allStocks
            .filter(stock =>
              stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
              stock.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((stock, index) => (
              <div className="all-stocks-stock" key={stock.symbol + index}>
                <h6>{stock.exchange}</h6>
                <span>
                  <h5>Stock name</h5>
                  <p>{stock.name}</p>
                </span>
                <span>
                  <h5>Symbol</h5>
                  <p>{stock.symbol}</p>
                </span>
                <span>
                  <h5>Stock Type</h5>
                  <p>{stock.type}</p>
                </span>
                <button className='btn btn-primary' onClick={() => navigate(`/stock/${stock.symbol}`)}>
                  View Chart
                </button>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  );
};

export default Home;
