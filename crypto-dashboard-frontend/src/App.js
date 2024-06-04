import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const App = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState(['BTCUSDT', 'ETHUSDT']);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/coins');
        setCoins(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCoins();
  }, []);

  const handleAddCoin = (coin) => {
    if (!selectedCoins.includes(coin)) {
      setSelectedCoins([...selectedCoins, coin]);
    }
  };

  const handleRemoveCoin = (coin) => {
    setSelectedCoins(selectedCoins.filter(item => item !== coin));
  };

  const selectedData = selectedCoins.map(coinSymbol => {
    const coin = coins.find(c => c.symbol === coinSymbol);
    return coin ? parseFloat(coin.priceChangePercent) : 0;
  });

  return (
    <div>
      <h1>Crypto Heatmap</h1>
      <div>
        <select onChange={(e) => handleAddCoin(e.target.value)}>
          {coins.map(coin => (
            <option key={coin.symbol} value={coin.symbol}>{coin.symbol}</option>
          ))}
        </select>
        <ul>
          {selectedCoins.map(coin => (
            <li key={coin}>
              {coin} <button onClick={() => handleRemoveCoin(coin)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: selectedCoins.map((coin, index) => ({ i: coin, x: index % 6, y: Math.floor(index / 6), w: 1, h: 1 })) }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 5, sm: 4, xs: 2, xxs: 1 }}
        rowHeight={100}
      >
        {selectedCoins.map((coin, index) => (
          <div key={coin} className="coin-box" style={{ background: selectedData[index] > 0 ? 'green' : 'red' }}>
            <span>{coin}</span>
            <span>{selectedData[index].toFixed(2)}%</span>
          </div>
        ))}
      </ResponsiveGridLayout>
      <style jsx>{`
        .coin-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default App;
