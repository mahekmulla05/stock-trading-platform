import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';
import '../styles/AdminStockChart.css';

/**
 * AdminStockChart page allows admins to view a stock's performance 
 * without the buy/sell controls.
 */
const AdminStockChart = () => {
  const { id } = useParams(); // Stock symbol from URL (e.g., AAPL)
  const [stockValues, setStockValues] = useState([]);
  const [stockExchange, setStockExchange] = useState('');

  // API Configuration (Ideally these should be in a .env file)
  const RAPID_API_KEY = '947b801f92msh96b919932628932p1a1413jsncb9cc7188719';
  const RAPID_API_HOST = 'twelve-data1.p.rapidapi.com';

  /**
   * Transforms raw API data into candlestick format for the chart.
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
   * fetchStockData gets historical time series for the chart.
   */
  const fetchStockData = useCallback(async () => {
    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/time_series',
      params: {
        symbol: id,
        interval: '1min',
        outputsize: '50',
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
      const transformedData = apiResponses.map(item => transformAndAppendData(item));
      setStockValues(transformedData);
    } catch (error) {
      console.error("AdminChart: Error fetching data:", error);
    }
  }, [id, transformAndAppendData]);

  // Load chart data when the page opens
  useEffect(() => {
    fetchStockData();
  }, [fetchStockData]);

  // ApexCharts Config
  const series = [{ data: stockValues }];
  const chartOptions = {
    chart: { type: 'candlestick', height: 350 },
    title: { text: `${id} - ${stockExchange}`, align: 'left' },
    xaxis: { type: 'datetime' },
    yaxis: { tooltip: { enabled: true } }
  };

  return (
    <div className="adminStockPage">
      <div className="adminStockChart">
        {stockValues.length > 0 ? (
          <Chart options={chartOptions} series={series} type="candlestick" height="100%" />
        ) : (
          <p style={{ textAlign: 'center', paddingTop: '20%' }}>Loading admin chart view...</p>
        )}
      </div>
    </div>
  );
};

export default AdminStockChart;