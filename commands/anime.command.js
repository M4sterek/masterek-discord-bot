const fetch = require("node-fetch")
const {
    MessageEmbed
} = require("discord.js")
const {
    prefix
} = require(__dirname + "/../config/config.js")


module.exports = {
    name: "anime",
    category: "anime",
    description: "Sends info about provided anime!",
    usage: "[anime]",
    example: "Death Note",
    guildOnly: true,
    args: true,
    cooldown: 10,
    async run(msg, args) {
        const {
            channel
        } = msg

        //
        let animeName = args
        let url = `https://kitsu.io/api/edge/anime?filter[text]=${animeName}`
        let response = await fetch(url)
        let json = await response.json()
        //
        const data = []
        const animeEmbed = new MessageEmbed()
            .setAuthor("TYPE THE NUMBER YOU WANT TO SHOW!", msg.author.displayAvatarURL())
            .setFooter(`Powered by kitsu.io | type ${prefix}cancel to cancel`, msg.author.displayAvatarURL())
            .setColor(3447003)
            
        const sendAnimeInfo = (jsonArray) => {
            const animeInfoEmbed = new MessageEmbed()
                .setAuthor(`${jsonArray.attributes.titles.en || jsonArray.attributes.titles.en_jp || jsonArray.attributes.titles.en_us} (${jsonArray.attributes.titles.ja_jp ? jsonArray.attributes.titles.ja_jp : "Japanese title not found!"})`, jsonArray.attributes.posterImage.large,`https://kitsu.io/anime/${jsonArray.attributes.slug}`)
                .setDescription(jsonArray.attributes.description)
                .setColor(3447003)
                .setThumbnail(jsonArray.attributes.posterImage.medium)
                .addField("📅 Release Date", jsonArray.attributes.startDate ? jsonArray.attributes.startDate : " - ", true)
                .addField("📆 End Date", jsonArray.attributes.endDate ? jsonArray.attributes.endDate : " - ", true)
                .addField("🎬 Episodes", jsonArray.attributes.episodeCount ? jsonArray.attributes.episodeCount : " - ", true)
                .addField("📏 Episodes length", jsonArray.attributes.episodeLength ? jsonArray.attributes.episodeLength : " - ", true)
                .addField("🛑 Rating", `${jsonArray.attributes.ageRatingGuide ?  jsonArray.attributes.ageRatingGuide : " - " } | ${jsonArray.attributes.ageRating ? jsonArray.attributes.ageRating : " - "}`, true)
                .addField("📺 Type", jsonArray.attributes.showType ? jsonArray.attributes.showType : " - ", true)
                .addField("⏯ Trailer", jsonArray.attributes.youtubeVideoId ? `[Click me!](https://www.youtube.com/watch?v=${jsonArray.attributes.youtubeVideoId} )` : " - ", true)
                .addField("⭐ Favorites Count", jsonArray.attributes.favoritesCount ? jsonArray.attributes.favoritesCount : " - ", true)
                .addField("👑 Rank", jsonArray.attributes.ratingRank ? `**TOP ${jsonArray.attributes.ratingRank}**` : " - ", true)
                .addField("🏆 Average Rating", jsonArray.attributes.averageRating ? `**${jsonArray.attributes.averageRating}/100**` : " - ", true)
                .setFooter("Powered by kitsu.io", msg.author.displayAvatarURL())
            channel.send(animeInfoEmbed)
        }
        
        const messageCollected = () => {
            channel.send(animeEmbed)
                .then(() => {
                    const filter = response => {
                        return response.author.id === msg.author.id
                    }
                    channel.awaitMessages(filter, {
                            max: 1,
                            time: 30000,
                            errors: ["time"]
                        })
                        .then(collected => {
                            collectedMessage = collected.first().content
                            let number = parseInt(collectedMessage) - 1
                            switch (collectedMessage) {
                                case "1":
                                    sendAnimeInfo(json.data[number])
                                    break
                                case "2":
                                    sendAnimeInfo(json.data[number])
                                    break
                                case "3":
                                    sendAnimeInfo(json.data[number])
                                    break
                                case "4":
                                    sendAnimeInfo(json.data[number])
                                    break
                                case "5":
                                    sendAnimeInfo(json.data[number])
                                    break
                                case `${prefix}cancel`:
                                    return
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                })
        }
        for (i = 0; i < 5; i++) {
            try{
            const anime = json.data[i]
            let animeName = anime.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.titles.en_us
            let animeNameJp = anime.attributes.titles.ja_jp
            data.push(`**${i+1}. [${animeName}](https://kitsu.io/anime/${anime.attributes.slug})** (${animeNameJp ? animeNameJp : "Japanese title not found!"})`)
            }catch(error){
                console.log(error)
            }
        }
        if(data.length<5){
            channel.send("There was an error to finding more anime by provided name")
        }

        animeEmbed.setDescription(data)
        messageCollected()

    }
}