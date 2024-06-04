const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/coins', async (req, res) => {
    try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
        const coins = response.data.map(coin => ({
            symbol: coin.symbol,
            priceChangePercent: coin.priceChangePercent
        }));
        res.json(coins);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
