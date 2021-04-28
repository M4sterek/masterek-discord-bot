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
            const song = serverQueue.songs[0]
            const queueEmbed = new MessageEmbed()
                .setColor(3066993)
                .setAuthor("Song queue", client.user.displayAvatarURL({
                    format: 'png'
                }))
                .setThumbnail(song.miniature)
            const songs = serverQueue.songs.splice(1, serverQueue.songs.length - 1)
            if (!songs.length) {
                queueEmbed
                    .setDescription(`💿 | **NOW PLAYING**\n**[${song.title}](${song.url})**\n**${song.author}** [\`${song.length}\`]`)
                return serverQueue.txtChannel.send(queueEmbed)
            }
            let data = []
            let i = 1
            for (let song of serverQueue.songs) {
                data.push(`${i}. [${song.title}](${song.url}) [\`${song.length}\`]`)
            }
            queueEmbed
                .setDescription(`💿 | **NOW PLAYING**\n**[${song.title}](${song.url})**\n**${song.author}** ${song.length}\n\n${data}`)
            return queueEmbed
        }
        return channel.send(songsQueue(serverQueue))
    }
}
