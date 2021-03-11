const fetch = require("node-fetch")
const {
    MessageEmbed
} = require("discord.js")
const {
    prefix
} = require(__dirname + "/../config/config.js")


module.exports = {
    name: "anime",
    description: "Sends info about provided anime!",
    guildOnly: true,
    cooldown: 5,
    async run(msg, args) {
        console.log(prefix)
        const sendAnimeInfo = (jsonArray, channel) => {

            const animeInfoEmbed = new MessageEmbed()
                .setAuthor(`${jsonArray.attributes.titles.en || jsonArray.attributes.titles.en_jp} (${jsonArray.attributes.titles.ja_jp})`, jsonArray.attributes.posterImage.large)
                .setDescription(jsonArray.attributes.description)
                .setColor(3447003)
                .setThumbnail(jsonArray.attributes.posterImage.medium)
                .addField("📅 Release Date", jsonArray.attributes.startDate, true)
                .addField("📆 End Date", jsonArray.attributes.endDate, true)
                .addField("🎬 Episodes", jsonArray.attributes.episodeCount, true)
                .addField("📏 Episodes length", jsonArray.attributes.episodeLength, true)
                .addField("🛑 Rating", jsonArray.attributes.ageRating + " | " + jsonArray.attributes.ageRatingGuide, true)
                .addField("📺 Type", jsonArray.attributes.showType, true)
                .addField("📊 Status", jsonArray.attributes.status.toUpperCase(), true)
                .addField("💾 Link", `[Click me!](${jsonArray.links.self})`, true)
                .addField("⭐ Favorites Count", jsonArray.attributes.favoritesCount, true)
                .setFooter("Powered by kitsu.io", msg.author.displayAvatarURL())
            channel.send(animeInfoEmbed)
        }
        const messageCollected = (animeEmbed, channel) => {
            channel.send(animeEmbed)
                .then(() => {
                    channel.awaitMessages(filter, {
                            max: 1,
                            time: 30000,
                            errors: ["time"]
                        })
                        .then(collected => {
                            collectedMessage = collected.first().content
                            switch (collectedMessage) {
                                case "1":
                                    sendAnimeInfo(json.data[0], channel)
                                    break
                                case "2":
                                    sendAnimeInfo(json.data[1], channel)
                                    break
                                case "3":
                                    sendAnimeInfo(json.data[2], channel)
                                    break
                                case "4":
                                    sendAnimeInfo(json.data[3], channel)
                                    break
                                case "5":
                                    sendAnimeInfo(json.data[4], channel)
                                    break
                                case `${prefix}cancel`:
                                    return
                            }
                        })
                        .catch(() => {
                            channel.send("**You have got 30s to answer!**")
                        })
                })
        }
        const {
            channel
        } = msg
        const animeEmbed = new MessageEmbed()
        let animeName = args
        let url = `https://kitsu.io/api/edge/anime?filter[text]=${animeName}`
        let response = await fetch(url)
        let json = await response.json()


        animeEmbed
            .setAuthor("TYPE THE NUMBER YOU WANT TO SHOW!", msg.author.displayAvatarURL())
            .setFooter(`Powered by kitsu.io | type ${prefix}cancel to cancel`, msg.author.displayAvatarURL())
            .setColor(3447003)
        for (i = 0; i < 5; i++) {
            const anime = json.data[i]
            let animeName = anime.attributes.titles.en || anime.attributes.titles.en_jp
            let animeNameJp = anime.attributes.titles.ja_jp
            animeEmbed.addField(`\u200B`, `${i+1}. [${animeName}](${anime.links.self}) (${animeNameJp})`)

        }
        const filter = response => {
            return response.author.id === msg.author.id
        }
        messageCollected(animeEmbed, channel)

    }
}