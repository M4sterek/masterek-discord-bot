const {
    queue
} = require(__dirname + "/../config/config.js")
const {
    MessageEmbed
} = require('discord.js')
module.exports = {
    name: "queue",
    category: "music",
    description: "play some music!",
    botPermissions: [],
    userPermissions: [],
    aliases: ['q'],
    run(msg, args) {
        const {
            channel,
            guild,
            client
        } = msg
        const serverQueue = queue.get(guild.id)
        const songsQueue = (serverQueue) => {
            if (!serverQueue) {
                return "Server queue doesn't exists! You need to use play first!"
            }
            if (!serverQueue.songs.length) {
                return "Queue is empty!"
            }
            let data = []
            if(serverQueue.songs.length>1){
            for (let i = 1; i<serverQueue.songs.length;i++) {
                songe = serverQueue.songs[i]
                data.push(`${i}. [${songe.title}](${songe.url}) [\`${songe.length}\`]\n`)
            }
        }

            const song = serverQueue.songs[0]
            const queueEmbed = new MessageEmbed()
                .setColor(3066993)
                .setAuthor("Song queue", client.user.displayAvatarURL({
                    format: 'png'
                }))
                .setThumbnail(song.miniature)
                .setDescription(`💿 | **NOW PLAYING**\n**[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})**\n**${serverQueue.songs[0].author}** [\`${serverQueue.songs[0].length}\`]\n${data.join('')}`)
            return queueEmbed
        }
        return channel.send(songsQueue(serverQueue))
    }
}
