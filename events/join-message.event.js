const {
    welcomeCanvas
} = require(__dirname + "/../canvas/canvas.js")
const channelId = "808320839547486230"
module.exports = {
    name: "guildMemberAdd",
    run(member) {
        const {
            client
        } = member
        const {
            channels
        } = client
        channels.fetch("808320839547486230")
            .then(channel => {
                welcomeCanvas(member, channel)
            })
            .catch(console.error)

    }
}