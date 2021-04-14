require("dotenv").config()

module.exports = {
    token: process.env.TOKEN,
    prefix: "ed.",
    waitingTime: 1000,
    firebaseConfig:{
        apiKey: process.env.FIREBASE_TOKEN,
        authDomain: "masterek-discord-bot.firebaseapp.com",
        databaseURL: "https://masterek-discord-bot.firebaseio.com",
        storageBucket: "masterek-discord-bot.appspot.com",

    }
}