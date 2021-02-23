const fetch = require('node-fetch')

module.exports = {
    name: "osu",
    description: "Send provided player stats!",
    usage: "<osu.nick>",
    example: "GrabcioPL",
    guildOnly: true,
    cooldown: 3,
    async run(msg, args) {
        let osuName = args
        let url = `https://osu.ppy.sh/api/v2/${process.env.OSU_TOKEN}&g=pg-13&limit=50&q=${q}`
        let response = await fetch(url)
        let json = await response.json()
        msg.channel.send(json.data[randomInt(0, json.data.length - 1)].url)

    }
}