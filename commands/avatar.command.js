const {
    MessageEmbed, Client
} = require("discord.js")

module.exports = {
    name: "avatar",
    description: "Send avatar of mentioned user",
    usage: "<player.id>",
    example: "@Example#2332",
    guildOnly: true,
    aliases: ["zdjecie"],
    run(msg, client) {
        const {
            channel
        } = msg
        if (!msg.mentions.users.size) {
            const avatarPng = msg.author.displayAvatarURL({
                format: 'png',
                size: 1024
            })
            const avatarJpg = msg.author.displayAvatarURL({
                format: 'jpg',
                size: 1024
            })
            const avatarWebp = msg.author.displayAvatarURL({
                format: 'webp',
                size: 1024
            })

            const msgEmbed = new MessageEmbed()
                .setAuthor(`Avatar for @${msg.author.tag}`, avatarPng)

                .setColor(msg.member.displayHexColor)
                .addField("Links: ", `[png](${avatarPng}) | [webp](${avatarWebp}) | [jpg](${avatarJpg})`, true)
                .setImage(avatarPng)
                .setFooter("You look beautiful!")


            channel.send(msgEmbed)
            return
        }


        let memberTarget = msg.mentions.users.first()
        let userColor = msg.mentions.members.first()
        const avatarPng = memberTarget.displayAvatarURL({
            format: 'png',
            size: 1024
        })
        const avatarJpg = memberTarget.displayAvatarURL({
            format: 'jpg',
            size: 1024
        })
        const avatarWebp = memberTarget.displayAvatarURL({
            format: 'webp',
            size: 1024
        })
        
        const msgEmbed = new MessageEmbed()
            .setAuthor(`Avatar for @${memberTarget.tag}`, avatarPng)
            .setColor(userColor.displayHexColor)
            .addField("Links: ", `[png](${avatarPng}) | [webp](${avatarWebp}) | [jpg](${avatarJpg})`, true)
            .setImage(avatarPng)
            .setFooter("You look beautiful!")


        channel.send(msgEmbed)
    }




}