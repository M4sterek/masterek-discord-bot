module.exports = {
    name: "prefix",
    category: "other",
    description: "Set prefix of current guild!",
    guildOnly: true,
    run(msg, args) {
        const {
            client,
            channel
        } = msg
        const {
            settings
        } = client
        const argsPrefix = args[0]

        if (!argsPrefix) {
            let prefix = settings.get
            channel.send


        }

    }
}