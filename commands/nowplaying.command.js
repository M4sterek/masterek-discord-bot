const {
    queue
} = require(__dirname + "/../config/config.js")
const {
    MessageEmbed
} = require('discord.js')
module.exports = {
    name: "nowplaying",
    category: "music",
    description: "play some music!",
    botPermissions: [],
    userPermissions: [],
    aliases: ['np'],
    run(msg, args) {
        const {
            channel,
            guild,
            client
        } = msg
        const serverQueue = queue.get(guild.id)
        const nowPlaying = (serverQueue) => {
            if (!serverQueue) {
                return channel.send("Server queue doesn't exists! You need to use play first!")
            }
            if (!serverQueue.songs.length) {
                return serverQueue.txtChannel.send("Queue is empty!")
            }
            const song = serverQueue.songs[0]
            const queueEmbed = new MessageEmbed()
                .setColor(3066993)
                .setAuthor("NOW PLAYING", client.user.displayAvatarURL({
                    format: 'png'
                }))
                .setThumbnail(song.miniature)
                .setDescription(`💿 | **NOW PLAYING**\n**[${song.title}](${song.url})**\n**${song.author}** [\`${song.length}\`]`)
            return queueEmbed
        }
        return channel.send(nowPlaying(serverQueue))
    }
}