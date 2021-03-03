const {
    MessageEmbed
} = require("discord.js")
const {randomInt} = require(__dirname+"/../functions/random.function.js")
module.exports = {
    name: "avatar",
    description: "Send avatar of mentioned user!",
    usage: "<player.id>",
    example: "@Example#2332",
    guildOnly: true,
    aliases: ["zdjecie"],
    run(msg) {
        const {
            channel
        } = msg

        const data = ["You look beautiful!", "Fine photo!", "You look amazing!"]

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
                .setFooter(data[randomInt(0, data.length - 1)])



            return channel.send(msgEmbed)
        }

        //let id = args[0]
        let memberTarget = msg.mentions.users.first() //|| msg.client.users.fetch(id)
        let userColor = msg.mentions.members.first() //|| msg.guild.members.fetch(id)
        if (!memberTarget && userColor) {
            return channel.send("You need to mention smb or provide id")
        }
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
            .setFooter(data[randomInt(0, data.length - 1)])


        channel.send(msgEmbed)
    }




}