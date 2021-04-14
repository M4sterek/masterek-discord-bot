const {
    MessageEmbed
} = require("discord.js")
const {randomInt} = require(__dirname+"/../resources/functions/random.function.js")
module.exports = {
    name: "avatar",
    category: "other",
    description: "Send avatar of mentioned user!",
    usage: "<player.id>",
    example: "@Example#2332",
    guildOnly: true,
    aliases: ["zdjecie"],
    run(msg, args) {
        const {
            channel
        } = msg

        const data = ["You look beautiful!", "Fine photo!", "You look amazing!"]
        
        if (!args.length) {
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
        const memberTarget = msg.mentions.members.first() 
        const userTarget =  msg.mentions.users.first() 
        if (!memberTarget && !userTarget) {
            return channel.send("You need to mention smb or provide id")
        }
        const avatarPng = userTarget.displayAvatarURL({
            format: 'png',
            size: 1024
        })
        const avatarJpg = userTarget.displayAvatarURL({
            format: 'jpg',
            size: 1024
        })
        const avatarWebp = userTarget.displayAvatarURL({
            format: 'webp',
            size: 1024
        })
        
        const msgEmbed = new MessageEmbed()
            .setAuthor(`Avatar for ${userTarget.tag}`, avatarPng)
            .setColor(memberTarget.displayHexColor)
            .addField("Links: ", `[png](${avatarPng}) | [webp](${avatarWebp}) | [jpg](${avatarJpg})`, true)
            .setImage(avatarPng)
            .setFooter(data[randomInt(0, data.length - 1)])
    
        channel.send(msgEmbed)    
    }
}