const {
    queue
} = require(__dirname + "/../config/config.js")
module.exports = {
    name: "stop",
    category: "music",
    description: "play some music!",
    botPermissions: [],
    userPermissions: [],
    aliases: ['leave'],
    run(msg, args) {
        const {
            guild,
            channel
        } = msg
        const serverQueue = queue.get(guild.id)
        const stop = (serverQueue) => {
            serverQueue.vcChannel.leave()
            queue.delete(guild.id)
            return `**Left voice channel**: \`${serverQueue.vcChannel.name}!\``
        }
        channel.send(stop(serverQueue))
    }
}