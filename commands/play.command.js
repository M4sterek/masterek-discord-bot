const {
    Permissions: {
        FLAGS
    },
    MessageEmbed,
    Collection
} = require("discord.js")
const {
    prefix
} = require(__dirname + "/../config/config.js")
const {
    isURL
} = require(__dirname + "/../resources/functions/isUrl.function.js")
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const {queue} = require(__dirname+"/../config/config.js")
module.exports = {
    name: "play",
    category: "music",
    description: "play some music!",
    args: true,
    usage: "[title]",
    example: "Never gonna give u up",
    botPermissions: [],
    userPermissions: [],
    aliases: ["p"],
    async run(msg, args) {
        const {
            member,
            channel,
            client,
            guild
        } = msg
        const serverQueue = queue.get(guild.id)
        const playSong = (URL) => {
            const serverQueue = queue.get(guild.id)
            const broadcast = client.voice.createBroadcast()
            broadcast.play(ytdl(URL))
            const dispatcher = serverQueue.connection
                .play(ytdl(URL))
                .on('finish', () => {
                    serverQueue.songs.shift()
                    if (!serverQueue.songs.length) {
                        return setTimeout(() => {
                            if (!serverQueue.songs.length) {
                                queue.delete(guild.id)
                                serverQueue.vcChannel.leave()
                                return channel.send("Queue is empty! Leaving voice channel!")
                            }
                            playSong(serverQueue.songs[0].url)
                            return channel.send(`\`${serverQueue.songs[0].title}\` **added to queue!**`)
                        }, 3000)
                    }
                    playSong(serverQueue.songs[0].url)
                })
        }
        const play = async (serverQueue) =>{
            let titleArg;
            try {
                titleArg = new URL(args[0])
                if (titleArg.host !== "www.youtube.com") {
                    return channel.send("Unknown file format!")
                }
            } catch {
                titleArg = args.join(" ")
            }
            if (isURL(titleArg, URL) === false) {
                try {
                    const filter1 = await ytsr.getFilters(titleArg)
                    const filters1 = filter1.get('Type').get('Video')
                    const result = await ytsr(filters1.url, {
                        pages: 1
                    })
                    titleArg = result.items[0].url

                } catch {
                    console.error("Error with searching video!")
                    return channel.send("Error with searching video! | Maybe it doesn't exist")
                }
            }
            const songInfo = await ytdl.getInfo(titleArg)
            const songLength = `${Math.floor(songInfo.videoDetails.lengthSeconds/60)}:${songInfo.videoDetails.lengthSeconds%60<10 ? "0"+songInfo.videoDetails.lengthSeconds%60 : songInfo.videoDetails.lengthSeconds%60}`
            let song = {
                author: songInfo.videoDetails.ownerChannelName,
                length: songLength,
                miniature: songInfo.videoDetails.thumbnails[0].url,
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url
            }
            console.log(song)
            if (!serverQueue) {
                const queueConstructor = {
                    txtChannel: msg.channel,
                    vcChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 10,
                    playing: true
                }
                queueConstructor.songs.push(song)
                queue.set(guild.id, queueConstructor)
                try {
                    const connection = await voiceChannel.join()
                    queue.get(guild.id).connection = connection
                    playSong(queue.get(guild.id).songs[0].url)
                    return channel.send(`\`${queue.get(guild.id).songs[0].title}\` **added to queue!**`)
                } catch {
                    queue.get(guild.id).songs.shift
                    console.log("Unable to play video!")
                    return channel.send("Unable to play video!")
                }

            }
            if(serverQueue.vcChannel !== member.voice.channel ){
                    serverQueue.vcChannel = member.voice.channel
                    serverQueue.songs = []
                    serverQueue.songs.push(song)
                    const connection = await serverQueue.vcChannel.join()
                    serverQueue.connection = connection
                    playSong(serverQueue.songs[0].url)
                    return channel.send(`\`${song.title}\` **added to queue!**`)
                }
                serverQueue.songs.push(song)
                return channel.send(`\`${song.title}\` **added to queue!**`)
        }
        
        const voiceChannel = member.voice.channel;

        if (!voiceChannel) {
            return channel.send("You must be in voice chat to use this command!")
        }
        if (!voiceChannel.joinable) {
            return channel.send(`I can't join in ${voiceChannel.name}! Maybe I don't have enough permissions.`)
        }
        play(serverQueue)


    }
}