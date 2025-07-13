const axios = require('axios');
const sendPumpAlert = require('./sendAlert');

// Thresholds
const VOLUME_THRESHOLD = 1.5;  // 1.5x sudden increase
const RSI_THRESHOLD = 30;      // RSI below 30 = potential reversal

async function analyzeCoin(coin) {
  try {
    const priceRes = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
    const price = priceRes.data[coin].usd;

    const marketRes = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=1`);
    const volumes = marketRes.data.total_volumes.map(x => x[1]);
    
    const lastVolume = volumes[volumes.length - 1];
    const prevVolume = volumes[volumes.length - 2];
    
    const suddenVolumeSpike = lastVolume > prevVolume * VOLUME_THRESHOLD;

    // Simulated RSI condition (placeholder - real RSI requires OHLC data)
    const fakeRSI = Math.floor(Math.random() * 100);

    if (suddenVolumeSpike && fakeRSI < RSI_THRESHOLD) {
      console.log(`🚀 PUMP DETECTED for ${coin.toUpperCase()}!`);
      await sendPumpAlert(coin.toUpperCase(), price);
    } else {
      console.log(`❌ No pump for ${coin.toUpperCase()}. Volume/RSI not matched.`);
    }

  } catch (error) {
    console.error('❌ Error analyzing coin:', error.message);
  }
}

analyzeCoin('bitcoin'); // You can change to any coin id from coingecko (e.g., 'ethereum', 'dogecoin')
