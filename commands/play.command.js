const {
    Permissions: {
        FLAGS
    },
    MessageEmbed
} = require("discord.js")
const {
    prefix
} = require(__dirname + "/../config/config.js")
const path = require('path');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
module.exports = {
    name: "music",
    category: "music",
    description: "play some music!",
    usage: "[title]",
    example: "Never gonna give u up",
    botPermissions: [FLAGS.ADMINISTRATOR],
    userPermissions: [],
    async run(msg, args) {
        const {
            member,
            channel,
            client
        } = msg
        const playMusicUrl = (connection, URL) => {
            const broadcast = client.voice.createBroadcast()
            broadcast.play(ytdl(URL))
            connection.play(broadcast)
        }
        const voiceChannel = member.voice.channel
        if (args[0] === "play") {
            if (!voiceChannel) {
                return channel.send("You must be in voice channel!")
            }
            if (!voiceChannel.joinable) {
                return channel.send("I cannot join into your channel! Maybe I need more permisssions!")
            }
            const data = []
            const titleArgs = args.slice(1).join(" ")
            const ytsrResponse = await ytsr(titleArgs, {
                gl: "pl",
                limit: 5,
                safeSearch: true
            })
            console.log(ytsrResponse)
            if(!ytsrResponse){
                return channel.send("There was an error!")
            }
            if (!ytsrResponse.items.length) {
                return channel.send("Videos not found!")
            }
            let i = 1;
            for (const video of ytsrResponse.items) {
                try{
                //if(video.type !== "video") return
                data.push(`${i}. **[${video.title}](${video.url})**`)
                i++
                }
                catch(error){
                    console.log(error)
                }
            }
            if (!data.length) {
                return channel.send("Video not found!")
            }
            const ytEmbed = new MessageEmbed()
                .setAuthor("TYPE THE NUMBER YOU WANT TO SHOW!", msg.author.displayAvatarURL())
                .setFooter(`Powered by ytdl-core | type ${prefix}cancel to cancel`, msg.author.displayAvatarURL())
                .setColor(3447003)
                .setDescription(data)

            return voiceChannel.join()
                .then(async (connection) => {
                    channel.send(`Joined in **${voiceChannel.name}**`)
                    channel.send(ytEmbed)
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
                                            playMusicUrl(connection, ytsrResponse.items[number].url)
                                            break
                                        case "2":
                                            playMusicUrl(connection, ytsrResponse.items[number].url)
                                            break
                                        case "3":
                                            playMusicUrl(connection, ytsrResponse.items[number].url)
                                            break
                                        case "4":
                                            playMusicUrl(connection, ytsrResponse.items[number].url)
                                            break
                                        case "5":
                                            playMusicUrl(connection, ytsrResponse.items[number].url)
                                            break
                                        case `${prefix}cancel`:
                                            return

                                    }
                                })
                                .catch(error => {
                                    console.log(error)
                                    voiceChannel.leave()
                                    return channel.send(`Left the ${voiceChannel.name}, time runned up!`)
                                })
                        })
                })
                .catch(console.error())
        }
        if (args[0] === "stop") {
            voiceChannel.leave()
            return channel.send(`Left the ${voiceChannel.name}`)


        }
    }
}