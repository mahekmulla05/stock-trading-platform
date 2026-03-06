import React, { useEffect, useState, useCallback } from 'react';
import '../styles/StockChart.css';
import Chart from 'react-apexcharts';
import axios from 'axios';
import API_URL from '../config';

import { useParams, useNavigate } from 'react-router-dom';

/**
 * StockChart page displays a candlestick chart for a specific stock
 * and allows users to buy or sell that stock.
 */
const StockChart = () => {
  const { id } = useParams(); // 'id' is the stock symbol from the URL (e.g., AAPL)
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  // Backend API location
  // We use the central API_URL from our config


  // Page state
  const [stockAction, setStockAction] = useState('buy'); // Toggle between buy and sell forms
  const [stockValues, setStockValues] = useState([]);    // Data for the candlestick chart
  const [stockPrice, setStockPrice] = useState(0);       // Current market price
  const [stockExchange, setStockExchange] = useState(''); // Exchange name (e.g., NASDAQ)

  // Trading form state
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [buyType, setBuyType] = useState('Intraday');
  const [sellQuantity, setSellQuantity] = useState(0);
  const [sellType, setSellType] = useState('Intraday');

  // RapidAPI configuration (Note: Ideally these should be in a .env file)
  const RAPID_API_KEY = '947b801f92msh96b919932628932p1a1413jsncb9cc7188719';
  const RAPID_API_HOST = 'twelve-data1.p.rapidapi.com';

  /**
   * Transforms raw API data into the format expected by ApexCharts.
   */
  const transformAndAppendData = useCallback((apiResponse) => {
    const close = parseFloat(apiResponse.close);
    const high = parseFloat(apiResponse.high);
    const low = parseFloat(apiResponse.low);
    const open = parseFloat(apiResponse.open);
    const timestamp = new Date(apiResponse.datetime).getTime();

    return {
      x: timestamp,
      y: [open, high, low, close]
    };
  }, []);

  /**
   * fetchPrice gets the latest single price for the stock.
   */
  const fetchPrice = useCallback(async () => {
    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/price',
      params: { symbol: id, format: 'json' },
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': RAPID_API_HOST
      }
    };
    try {
      const response = await axios.request(options);
      setStockPrice(parseFloat(response.data.price));
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  }, [id]);

  /**
   * fetchStockData gets the historical 'time series' data for the chart.
   */
  const fetchStockData = useCallback(async () => {
    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/time_series',
      params: {
        symbol: id,
        interval: '1min',
        outputsize: '50', // Smaller size for faster loading
        format: 'json'
      },
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': RAPID_API_HOST
      }
    };
    try {
      const response = await axios.request(options);
      setStockExchange(response.data.meta.exchange);

      const apiResponses = response.data.values;
      const transformedData = apiResponses.map(apiResponse => transformAndAppendData(apiResponse));
      setStockValues(transformedData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  }, [id, transformAndAppendData]);

  // Load data when the component first appears
  useEffect(() => {
    fetchStockData();
    fetchPrice();
  }, [fetchStockData, fetchPrice]);

  /**
   * handleBuy processes the purchase of a stock.
   */
  const handleBuy = async (e) => {
    e.preventDefault();
    if (buyQuantity <= 0) return alert("Please enter a quantity");

    try {
      // First, get the full name of the stock instrument
      const searchOptions = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/symbol_search',
        params: { symbol: id, outputsize: '1' },
        headers: { 'X-RapidAPI-Key': RAPID_API_KEY, 'X-RapidAPI-Host': RAPID_API_HOST }
      };
      const res = await axios.request(searchOptions);
      const stockName = res.data.data[0].instrument_name;

      // Then, tell our server to buy it
      await axios.post(`${API_URL}/buyStock`, {
        user: userId,
        symbol: id,
        name: stockName,
        stockType: buyType,
        stockExchange: stockExchange,
        price: stockPrice,
        count: buyQuantity,
        totalPrice: stockPrice * buyQuantity
      });

      alert("Purchase successful!");
      navigate('/history');
    } catch (error) {
      alert("Purchase failed! Check your balance or connection.");
    }
  };

  /**
   * handleSell processes the sale of a stock.
   */
  const handleSell = async (e) => {
    e.preventDefault();
    if (sellQuantity <= 0) return alert("Please enter a quantity");

    try {
      const searchOptions = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/symbol_search',
        params: { symbol: id, outputsize: '1' },
        headers: { 'X-RapidAPI-Key': RAPID_API_KEY, 'X-RapidAPI-Host': RAPID_API_HOST }
      };
      const res = await axios.request(searchOptions);
      const stockName = res.data.data[0].instrument_name;

      await axios.post(`${API_URL}/sellStock`, {
        user: userId,
        symbol: id,
        name: stockName,
        stockType: sellType,
        price: stockPrice,
        count: sellQuantity,
        totalPrice: stockPrice * sellQuantity
      });

      alert("Sale successful!");
      navigate('/history');
    } catch (error) {
      alert("Sale failed! Do you have enough stocks to sell?");
    }
  };

  // ApexCharts settings
  const series = [{ data: stockValues }];
  const chartOptions = {
    chart: { type: 'candlestick', height: 350 },
    title: { text: `${id} - ${stockExchange}`, align: 'left' },
    xaxis: { type: 'datetime' },
    yaxis: { tooltip: { enabled: true } }
  };

  return (
    <div className="stockPage">
      {/* Visual Chart Area */}
      <div className="stockChart">
        {stockValues.length > 0 ? (
          <Chart options={chartOptions} series={series} type="candlestick" height="100%" />
        ) : (
          <p style={{ textAlign: 'center', paddingTop: '20%' }}>Loading chart data...</p>
        )}
      </div>

      {/* Control Panel (Buy/Sell) */}
      <div className="stockChartActions">
        <div className="stockChartActions-head">
          <button
            className={stockAction === 'buy' ? 'button-active' : 'button-inactive'}
            onClick={() => setStockAction('buy')}
          >
            Buy {stockPrice > 0 && `@ $${Number(stockPrice).toFixed(2)}`}
          </button>
          <button
            className={stockAction === 'sell' ? 'button-active' : 'button-inactive'}
            onClick={() => setStockAction('sell')}
          >
            Sell {stockPrice > 0 && `@ $${Number(stockPrice).toFixed(2)}`}
          </button>
        </div>

        <div className="action-body">
          {stockAction === 'buy' ? (
            <form onSubmit={handleBuy}>
              <div className="mb-3">
                <label className="form-label">Product Type</label>
                <select className="form-select" onChange={(e) => setBuyType(e.target.value)} value={buyType}>
                  <option value="Intraday">Intraday</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => setBuyQuantity(e.target.value)}
                  value={buyQuantity}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Total Price (Estimated)</label>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  value={`$ ${Number(buyQuantity * stockPrice).toFixed(2)}`}
                />
              </div>
              <button type="submit" className="btn btn-success">Buy Now</button>
            </form>
          ) : (
            <form onSubmit={handleSell}>
              <div className="mb-3">
                <label className="form-label">Product Type</label>
                <select className="form-select" onChange={(e) => setSellType(e.target.value)} value={sellType}>
                  <option value="Intraday">Intraday</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => setSellQuantity(e.target.value)}
                  value={sellQuantity}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Total Sale Value</label>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  value={`$ ${Number(sellQuantity * stockPrice).toFixed(2)}`}
                />
              </div>
              <button type="submit" className="btn btn-danger">Sell Now</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockChart;
