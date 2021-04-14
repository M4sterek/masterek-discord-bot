const firebase = require('firebase')
const {firebaseConfig} = require(__dirname+"/../config/config.js")
// var admin = require("firebase-admin");
// var serviceAccount = require("path/to/serviceAccountKey.json");
module.exports = {
    name: "prefix",
    category: "other",
    description: "Set prefix of current guild!",
    guildOnly: true,
    async run(msg, args) {
        // admin.initializeApp({
        //   credential: admin.credential.cert(serviceAccount),
        //   databaseURL: "https://masterek-discord-bot-default-rtdb.firebaseio.com"
        // });
        // let db = admin.firestore()
        // console.log(db)
      

    }
}