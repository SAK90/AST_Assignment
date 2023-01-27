const telegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const token = process.env.TELEGRAM_BOT_TOKEN;
const axios = require("axios");

const bot = new telegramBot(token, { polling: true });

// dummy subscribedIds list
let subscribedIds = [
  { message_id: 123, chat: { id: 1248085991 } },
  { message_id: 124, chat: { id: 1248085991 } },
];

bot.onText(/start/, (message) => {
  console.log(message);
  setInterval(async () => {
    await axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=28.7041,77.1025&aqi=no`
      )
      .then((resp) => {
        subscribedIds.forEach((ID) => {
          bot.sendMessage(
            ID.chat.id,
            `Weather in Delhi is ${resp.data.current.temp_c} degree celcius`
          );
        });
      });
  }, 60000 * 60);
});
