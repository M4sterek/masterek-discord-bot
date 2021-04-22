const chalk = require('chalk')
const admin = require("firebase-admin");
const {serviceAccount} = require(__dirname + "/../config/config.js");
module.exports = {
    name: "ready",
    run() {
        try {
        admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://masterek-discord-bot-default-rtdb.firebaseio.com"
            })

        }catch(error){
            console.log(chalk.green(`Database initializing failed!`))
            console.error(error)
        }
        console.log(chalk.yellow(`Database succesfully initalized!`))
    }
}