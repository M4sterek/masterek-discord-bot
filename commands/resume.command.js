const {
    queue
} = require(__dirname + "/../config/config.js")
module.exports = {
    name: "resume",
    category: "music",
    description: "play some music!",
    botPermissions: [],
    aliases: [],
    run(msg, args) {
        const {
            guild,
            channel
        } = msg
        const serverQueue = queue.get(guild.id)
        const resume = (serverQueue) => {
            if (!serverQueue) {
                return "Server queue doesn't exists! You need to use play first!"
            }
            if (!serverQueue.songs[0]) {
                return "There's nothing to resume!"
            }
            if(serverQueue.playing === true){
                return `\`${serverQueue.songs[0].title}\` **is not paused!**`
            }
            serverQueue.connection.dispatcher.resume()
            serverQueue.playing = true
            return `**Resumed song:** \`${serverQueue.songs[0].title}\` `
        }
        channel.send(resume(serverQueue))
    }
}