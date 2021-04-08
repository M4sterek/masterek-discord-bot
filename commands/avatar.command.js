const {
    MessageEmbed
} = require("discord.js")
const {randomInt} = require(__dirname+"/../resources/functions/random.function.js")
module.exports = {
    name: "avatar",
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

        let id = args[0]
        console.log(id)
        // || msg.client.users.cache.fetch(id)
        //|| msg.guild.members.cache.fetch(id)
        const memberTarget = msg.mentions.members.first() 
        const userColor =  msg.mentions.users.first() 
        if (!memberTarget && !userColor) {
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