const {
    queue
} = require(__dirname + "/../config/config.js")
const {
    isURL
} = require(__dirname + "/../resources/functions/isUrl.function.js")
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const {
    prefix
} = require(__dirname + "/../config/config.js")
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "search",
    category: "music",
    description: "Search for music!",
    usage: "[title or URL]",
    example: "Never gonna give u up",
    args: true,
    botPermissions: [],
    userPermissions: [],
    aliases: [],
    run(msg, args) {
        const {
            guild,
            channel,
            member
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
            let songArg;
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
                    titleArg = result.items

                } catch {
                    console.error("Error with searching video!")
                    return channel.send("Error with searching video! | Maybe it doesn't exist")
                }
                const searchEmbed = new MessageEmbed()
                .setAuthor("TYPE THE NUMBER YOU WANT TO SHOW!", msg.author.displayAvatarURL())
                .setFooter(`Type ${prefix}cancel to cancel`, msg.author.displayAvatarURL())
                .setColor(3447003)
                const data = []
                for(let i=0;i<5;i++){
                    let song = titleArg[i]
                    data.push(`${i+1}. **[${song.title}](${song.url})**`)
                }
                searchEmbed
                    .setDescription(data)
                channel.send(searchEmbed)
                    .then(async()=>{
                        channel.awaitMessages(filter, {
                            max: 1,
                            time: 30000,
                            errors: ["time"]
                        }).then( (collected) => {
                            const collectedNumber = collected.first().content
                            let number = parseInt(collectedNumber) - 1
                            switch (collectedNumber) {
                                case "1":
                                    return songArg = titleArg[number]
                                case "2":
                                    return songArg = titleArg[number]
                                    
                                case "3":
                                    return songArg = titleArg[number]
                                    
                                case "4":
                                    return songArg = titleArg[number]
                                    
                                case "5":
                                    return songArg = titleArg[number]
                                    
                                case `${prefix}cancel`:
                                    return
                            }
                        })
                        .catch(() => {
                            return channel.send("**You have got 30s to answer!**")
                        })
                    })

            }
            console.log(songArg)
            const songInfo = await ytdl.getInfo(titleArg.url)
            const songLength = `${Math.floor(songInfo.videoDetails.lengthSeconds/60)}:${songInfo.videoDetails.lengthSeconds%60<10 ? "0"+songInfo.videoDetails.lengthSeconds%60 : songInfo.videoDetails.lengthSeconds%60}`
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