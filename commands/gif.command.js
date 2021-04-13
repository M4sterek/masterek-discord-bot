const {
    MessageEmbed
} = require('discord.js')
const fetch = require('node-fetch')
const {
    randomInt
} = require(__dirname + "/../resources/functions/random.function.js")
module.exports = {
    name: "gif",
    category: "fun",
    description: "Send a gif into chat!",
    usage: "<category of gif>",
    args: true,
    example: "cats",
    guildOnly: true,
    cooldown: 5,

    async run(msg, args) {
        const {
            channel
        } = msg

        let keyword = args
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_TOKEN}&g=g&limit=50&q=${keyword}`
        let response = await fetch(url)
        if (!response) return
        let json = await response.json()
        channel.send(json.data[randomInt(0, json.data.length - 1)].url)

    }
}