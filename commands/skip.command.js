const {
    queue
} = require(__dirname + "/../config/config.js")
module.exports = {
    name: "skip",
    category: "music",
    description: "play some music!",
    botPermissions: [],
    userPermissions: [],
    aliases: ['s'],
    run(msg, args) {
        const {
            guild,
            channel
        } = msg
        const serverQueue = queue.get(guild.id)
        const skip = (serverQueue) => {
            if (!serverQueue) {
                return channel.send("Server queue doesn't exists! You need to use play first!")
            }
            if (!serverQueue.songs.length) {
                return serverQueue.txtChannel.send("Queue is empty!")
            }
            if (serverQueue.songs.length === 1) {
                return serverQueue.txtChannel.send("There isn't a song I can skip to!")
            }
            serverQueue.connection.dispatcher.end()
        }
        skip(serverQueue)
    }
}