const {isURL} = require(__dirname+"/../resources/functions/isUrl.function.js")
module.exports = {
    name: "message",
    run(msg) {
        const {
            channel,
            author
        } = msg
        const channelsID = ["831294131472564334"]
        if (!(channelsID.includes(channel.id))) return
        if (isURL(msg.content,URL) === false) {
            try {
                msg.delete()
            } catch (error) {
                console.log(error)
            }
            return author.send(`You can post only GIF's on ${channel.name} in ${msg.guild.name}`)
        }
        if (msg.content.endsWith(".gif")) return
        if (msg.content.endsWith("mp4")) return

        try {
            msg.delete()
        } catch (error) {
            console.log(error)
        }
        return author.send(`You can post only GIF's on ${channel.name} in ${msg.guild.name}`)

    }
}