const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "avatar",
    description: "Send avatar of mentioned user",
    usage: "<player.id>",
    example: "@Example#2332",
    guildOnly: true,
    aliases: ["zdjecie"],
    run(msg){
        const {channel} = msg
        if(!msg.mentions.users.size){
            const avatarPng = msg.author.displayAvatarURL({ format: 'png', size: 1024 })
            const avatarJpg = msg.author.displayAvatarURL({ format: 'jpg', size: 1024 })
            const avatarWebp = msg.author.displayAvatarURL({ format: 'webp', size: 1024 })
            
            const msgEmbed =  new MessageEmbed()
            .setAuthor(`Avatar for @${msg.author.tag}`,avatarPng)
            
            .setColor(3447003)
            .addField("Links: ",`[png](${avatarPng}) | [webp](${avatarWebp}) | [jpg](${avatarJpg})`,true)
            .setImage(avatarPng)
            .setFooter("You look beautiful!")


            channel.send(msgEmbed)
            return
        }

        
            let targetMember = msg.mentions.users.first()
                const avatarPng = targetMember.displayAvatarURL({ format: 'png', size: 1024 })
                const avatarJpg = targetMember.displayAvatarURL({ format: 'jpg', size: 1024 })
                const avatarWebp = targetMember.displayAvatarURL({ format: 'webp', size: 1024 })
                const msgEmbed =  new MessageEmbed()
                .setAuthor(`Avatar for @${targetMember.tag}`,avatarPng)
            
                .setColor(3447003)
                .addField("Links: ",`[png](${avatarPng}) | [webp](${avatarWebp}) | [jpg](${avatarJpg})`,true)
                .setImage(avatarPng)
                .setFooter("You look beautiful!")


                channel.send(msgEmbed)
        }

        
        

    }
      
    
    
        

    