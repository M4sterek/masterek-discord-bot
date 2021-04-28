const {
    queue
} = require(__dirname + "/../config/config.js")
module.exports = {
    name: "skip",
    category: "music",
    description: "play some music!",
    botPermissions: [],
    userPermissions: [],
    aliases: ['s',"se"],
    run(msg, args) {
        const {
            guild,
            channel
        } = msg
        const serverQueue = queue.get(guild.id)
        const skip = (serverQueue) => {
            if (!serverQueue) {
                return "Server queue doesn't exists! You need to use play first!"
            }
            if (!serverQueue.songs.length) {
                return "Queue is empty!"
            }
            if (serverQueue.songs.length === 1) {
                return "There isn't a song I can skip to!"
            }
            serverQueue.connection.dispatcher.end()
            return `\`${serverQueue.songs[0].title}\` **skipped!**`
        }
        channel.send(skip(serverQueue))
    }
}