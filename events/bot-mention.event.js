const {
    prefix
} = require(__dirname + "/../config/config.js")
const admin = require('firebase-admin')
module.exports = {
    name: "message",
    async run(msg) {
        const {
            channel,
            client,
            guild
        } = msg
        const msgContent = msg.content
            .slice()
            .trim()
            .split(/ +/g)
            .shift()

        if (msgContent === `<@!${client.user.id}>`) {
            let db = admin.firestore()
            let PREFIX = await db.collection('guilds').doc(guild.id).get()
                .then(doc => {
                    if (!doc.exists) {
                        return prefix
                    }
                    if (!doc.data().prefix) {
                        return prefix
                    }
                    return doc.data().prefix
                })
            return channel.send(`:pray: :open_hands: | Use \`${PREFIX}help\``)
        }

    }
}