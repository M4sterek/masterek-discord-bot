const {
    prefix
} = require(__dirname + "/../config/config.js")
module.exports = {
    name: "message",
    run(msg) {
        const {
            channel,
            client
        } = msg
        const msgContent = msg.content
            .slice()
            .trim()
            .split(/ +/g)
            .shift()
        
        if (msgContent === `<@!${client.user.id}>`) {
            channel.send(`:pray: :open_hands:! Use \`${prefix}help\``)
        }

    }
}