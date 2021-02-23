const { description, cooldown } = require("./gif.command");

const fetch = require('node-fetch')
const {randomInt} = require(__dirname+"/../functions/random.function.js")
module.exports = {
    name: "cat",
    description: "Sends a random cat photo",
    cooldown: 5,
    aliases: ["kot"],
    async run(msg,args){
        let url = `https://api.thecatapi.com/v1/images/search?api_key=${process.env.CAT_TOKEN}`
        let response = await fetch(url)
        let json = await response.json()
        console.log(json)
        msg.channel.send(json[0].url)
    }


}