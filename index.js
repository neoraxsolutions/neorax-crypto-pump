const axios = require('axios');

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

function sendPumpAlert(coin, price) {
  const message = `🚀 Pump Alert!\nCoin: ${coin}\nPrice: $${price}\n#NeoraxCryptoPump`;
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  return axios.post(url, {
    chat_id: chatId,
    text: message
  });
}

sendPumpAlert('BTC', 58620)
  .then(() => console.log('✅ Alert sent!'))
  .catch(console.error);
