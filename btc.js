
import axios from 'axios';
const fetchBitcoinPrice = async () => {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin');
    const bitcoinData = response.data;
    const currentPrice = bitcoinData.market_data.current_price.usd;
    const allTimeHigh = bitcoinData.market_data.ath.usd;
    return `The current price of Bitcoin is $${currentPrice.toLocaleString()} \nWhich is ${Math.abs((currentPrice / allTimeHigh) * 100).toFixed(2)}% of its all-time high of $${allTimeHigh.toLocaleString()}\n#bitcoin #cryptocurrency`;
};

const post = await fetchBitcoinPrice()

import { login } from 'masto';

const masto = await login({
    url: process.env.URL,
    accessToken: process.env.TOKEN,
});

const status = await masto.v1.statuses.create({
    status: `${post}`,
    visibility: 'public',
});

console.log(status.url);
