const {isURL} = require(__dirname+"/../resources/functions/isUrl.function.js")
const { Collection } = require('discord.js')
const admin = require('firebase-admin')
const channels = new Collection()
module.exports = {
    name: "message",
    async run(msg) {
        const {
            channel,
            author,
            guild
        } = msg
        const serverChannels = channels.get(guild.id)
        if(!serverChannels){
            const db = admin.firestore()
            await db.collection('guilds').doc(guild.id).get()
            .then((doc)=>{
                if(!doc.exists) return
                if(!doc.data().gifChannels) return
                if(!doc.data().gifChannels.length) return
                channels.set(guild.id, doc.data().gifChannels)
            })
        }
        if (!(channels.get(guild.id).includes(channel.id))) return
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
        if (msg.content.endsWith("/mp4")) return

        try {
            msg.delete()
        } catch (error) {
            console.log(error)
        }
        if(!author.send) return
        return author.send(`You can post only GIF's on ${channel.name} in ${msg.guild.name}`)

    }
}