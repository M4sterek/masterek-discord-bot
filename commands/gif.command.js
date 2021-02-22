const fetch = require('node-fetch')
const {
    randomInt
} = require(__dirname + "/../functions/random.function.js")
module.exports = {
    name: "gif",
    description: "Send a gif into chat!",
    usage: "<category of gif>",
    example: "cats",
    guildOnly: true,
    cooldown: 5,
    async run(msg, args) {
        let q = args

        let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_TOKEN}&limit=50&q=${q}`
        let response = await fetch(url)
        let json = await response.json()
        msg.channel.send(json.data[randomInt(0,json.data.length-1)].url)

    }
}