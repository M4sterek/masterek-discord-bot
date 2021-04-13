module.exports = {
    name: "message",
    run(msg) {
        const {
            channel,
            author
        } = msg
        const channelsID = ["831294131472564334"]
        const isURL = (urlArg) => {
            let url
            try {
                url = new URL(urlArg)
            } catch (error) {
                return false;
            }
            return url.protocol === "http:" || url.protocol === "https:";
        }
        if (!(channelsID.includes(channel.id))) return
        if (isURL(msg.content) === false) {
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