const {
    MessageEmbed
} = require('discord.js')
const {
    botname,
    version
} = require(__dirname + "/../package.json")
const waitingEmbedConst = new MessageEmbed()
const defaultEmbedConst = new MessageEmbed()
const waitingEmbed = () => {
    waitingEmbedConst
        .setColor(15844367)
        .setDescription("Waiting for data...")
        .setTitle("Waiting")
    return waitingEmbedConst
}
const defaultEmbed = (msg) => {
    defaultEmbedConst
        .setColor(3066993)
        .setFooter(botname + " | version: " + version, msg.client.user.displayAvatarURL())
    return defaultEmbedConst
}

module.exports = {
    waitingEmbed,
    defaultEmbed
}