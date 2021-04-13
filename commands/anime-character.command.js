const {
    MessageEmbed
} = require('discord.js')
const fetch = require('node-fetch')
const {
    prefix
} = require(__dirname + "/../config/config.js")
module.exports = {
    name: "character",
    category: "anime",
    description: "Sends info about provided anime character!",
    usage: "[character]",
    example: "Light Yagami",
    guildOnly: true,
    args: true,
    cooldown: 5,
    async run(msg, args) {
        const {
            channel
        } = msg
        const filter = response => {
            return response.author.id === msg.author.id
        }
        const characterEmbed = new MessageEmbed()
            .setAuthor("TYPE THE NUMBER YOU WANT TO SHOW!", msg.author.displayAvatarURL())
            .setFooter(`Powered by kitsu.io | type ${prefix}cancel to cancel`, msg.author.displayAvatarURL())
            .setColor(3447003)
        const characterName = args
        //
        let characterURL = `https://kitsu.io/api/edge/characters?filter[name]=${characterName}`
        let response = await fetch(characterURL)
        let json = await response.json()
        //
        const data = []
        const sendCharacterInfo = (jsonArray) => {
            const characterInfoEmbed = new MessageEmbed()
                .setAuthor(`${jsonArray.attributes.names.en || jsonArray.attributes.names.en_jp || jsonArray.attributes.names.en_us} (${jsonArray.attributes.names.ja_jp ? jsonArray.attributes.names.ja_jp : "Japanese title not found!"})`, jsonArray.attributes.image.original, `https://myanimelist.net/character/${jsonArray.attributes.malId}`)
                .setDescription(jsonArray.attributes.description.replace(/<br>/g, "\n"))
                .setColor(3447003)
                .setThumbnail(jsonArray.attributes.image.original)
            channel.send(characterInfoEmbed)
        }

        for (i = 0; i < 5; i++) {
            try{
            const characterName = json.data[i].attributes.names.en
            const characterNameJp = json.data[i].attributes.names.ja_jp
            const characterMalID = json.data[i].attributes.malId
            data.push(`**${i+1}. [${characterName}](https://myanimelist.net/character/${characterMalID})** (${characterNameJp ? characterNameJp : "Japanese name not found!"})`)
            }
            catch(error){
                console.log(error)
            }
        }
        characterEmbed.setDescription(data)
        channel.send(characterEmbed)
            .then(() => {
                channel.awaitMessages(filter, {
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                }).then(collected => {
                    const collectedNumber = collected.first().content
                    let number = parseInt(collectedNumber) - 1
                    switch (collectedNumber) {
                        case "1":
                            sendCharacterInfo(json.data[number])
                            break
                        case "2":
                            sendCharacterInfo(json.data[number])
                            break
                        case "3":
                            sendCharacterInfo(json.data[number])
                            break
                        case "4":
                            sendCharacterInfo(json.data[number])
                            break
                        case "5":
                            sendCharacterInfo(json.data[number])
                            break
                        case `${prefix}cancel`:
                            return
                    }
                })
            })
            .catch(() => {
                channel.send("**You have got 30s to answer!**")
            })
    }
}