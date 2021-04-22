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
const admin = require("firebase-admin");
const queue = new Collection()
module.exports = {
    name: "music",
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
                                serverQueue.playing = false
                                return serverQueue.vcChannel.leave()
                            }
                            playSong(serverQueue.songs[0].url)
                        }, 3000)
                    }
                    playSong(serverQueue.songs[0].url)
                })
        }

        const voiceChannel = member.voice.channel;

        if (!voiceChannel) {
            return channel.send("You must be in voice chat to use this command!")
        }
        if (!voiceChannel.joinable) {
            return channel.send(`I can't join in ${voiceChannel.name}! Maybe I don't have enough permissions.`)
        }
        if (args[0] === "play") {
            let titleArg;
            try {
                titleArg = new URL(args[1])
                if (titleArg.host !== "www.youtube.com") {
                    return channel.send("Unknown file format!")
                }
            } catch {
                titleArg = args[1]
            }

            if (isURL(titleArg, URL) === false) {
                try {
                    const filter1 = await ytsr.getFilters(args.splice(1,args.length-1).join(" "))
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
            const songLength = `${Math.floor(songInfo.videoDetails.lengthSeconds/60)}:${songInfo.videoDetails.lengthSeconds%60}`
            let song = {
                author: songInfo.videoDetails.ownerChannelName,
                length: songLength,
                miniature: songInfo.videoDetails.thumbnails[0].url,
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url
            }
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
                    queue.get(guild.id).txtChannel.send(`\`${song.title}\` **added to queue!**`)
                    return playSong(queue.get(guild.id).songs[0].url)
                } catch {
                    queue.get(guild.id).songs.shift
                    console.log("Unable to play video!")
                }

            }
            if (serverQueue.playing === true) {
                serverQueue.songs.push(song)
                return serverQueue.txtChannel.send(`\`${song.title}\` **added to queue!**`)
            }
            try {
                serverQueue.songs.push(song)
                serverQueue.txtChannel.send(`\`${song.title}\` **added to queue!**`)
                const connection = await voiceChannel.join()
                serverQueue.connection = connection
                serverQueue.playing = true
                return playSong(serverQueue.songs[0].url)
            } catch {
                serverQueue.songs.push(song).get(guild.id).songs.shift
                console.log("Unable to play video!")
            }

        }
        if(args[0]==="queue"){
            if(!serverQueue){
                return channel.send("Server doesn't exists! You need to use play first!")
            }
            if(!serverQueue.songs.length){
                return serverQueue.txtChannel.send("Queue is empty!")
            }

            const song = serverQueue.songs[0]
            const queueEmbed = new MessageEmbed()
            .setColor(3066993)
            .setAuthor("Song queue")
            .setThumbnail(song.miniature)
            const songs = serverQueue.songs.splice(1,serverQueue.songs.length-1)
            if(!songs.length){
                queueEmbed
                    .setDescription(`💿 | NOW PLAYING\n**[${song.title}](${song.url})**\n**${song.author}** ${song.length}`)
                return serverQueue.txtChannel.send(queueEmbed)
            }
            let data = []
            let i = 1
            for(let song of serverQueue.songs){
                data.push(`${i}. [${song.title}](${song.url}) [\`${song.length}\`]`)
            }
            queueEmbed
                .setDescription(`💿 | NOW PLAYING\n**[${song.title}](${song.url})**\n**${song.author}** ${song.length}\n\n${data}`)


            return serverQueue.txtChannel.send(queueEmbed)
        }
        if(args[0]==="skip"){
            if(!serverQueue){
                return channel.send("Server doesn't exists! You need to use play first!")
            }
            if(!serverQueue.songs.length){
                return serverQueue.txtChannel.send("Queue is empty!")
            }
            if(!serverQueue.songs.length===1){
                return serverQueue.txtChannel.send("There isn't a song I can skip to!")
            }
            serverQueue.songs.shift()
            playSong(serverQueue.songs[0].url)
        }
    }
}