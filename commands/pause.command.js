const {
    queue
} = require(__dirname + "/../config/config.js")
module.exports = {
    name: "pause",
    category: "music",
    description: "play some music!",
    botPermissions: [],
    userPermissions: [],
    aliases: [],
    run(msg, args) {
        const {
            guild,
            channel
        } = msg
        const serverQueue = queue.get(guild.id)
        const pause = (serverQueue) => {
            if (!serverQueue) {
                return "Server queue doesn't exists! You need to use play first!"
            }
            if (!serverQueue.songs[0]) {
                return "There's nothing to pause!"
            }
            if(serverQueue.playing === false){
                return `\`${serverQueue.songs[0].title}\` **is actually paused!**`
            }
            serverQueue.connection.dispatcher.pause()
            serverQueue.playing = false
            return `**Paused song:** \`${serverQueue.songs[0].title}\` `
        }
        channel.send(pause(serverQueue))
    }
}