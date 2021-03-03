const { description, cooldown } = require("./gif.command");
const {MessageEmbed} = require('discord.js')
const fetch = require('node-fetch')
const {randomInt} = require(__dirname+"/../functions/random.function.js")
module.exports = {
    name: "cat",
    description: "Sends a random cat photo!",
    cooldown: 5,
    aliases: ["kot"],
    async run(msg){
        const catEmbed = new MessageEmbed()
        const catColor = msg.member.displayHexColor
        let url = `https://api.thecatapi.com/v1/images/search?api_key=${process.env.CAT_TOKEN}`
        let response = await fetch(url)
        let json = await response.json()
        catEmbed.setImage(json[0].url)
        catEmbed.setColor(catColor)
        msg.channel.send(catEmbed)
    }


}