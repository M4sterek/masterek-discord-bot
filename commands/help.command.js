const {
    MessageEmbed,
    Collection
} = require('discord.js')
const {
    prefix,
    waitingTime
} = require(__dirname + "/../config/config.js")
const {
    waitingEmbed,
    defaultEmbed,
} = require(__dirname + "/../canvas/embed.js")

module.exports = {
    name: "help",
    description: "Show commands!",
    usage: "[command]",
    example: "clear",
    run(msg, args) {
        const {
            commands
        } = msg.client
        const {
            channel
        } = msg

        let botinviteUrl = "https://discord.com/api/oauth2/authorize?client_id=691785599912509440&permissions=8&scope=bot"
        

        if (!args.length) {
            const membersCount = msg.client.guilds.cache.map((Guild) => Guild.memberCount)
            const serversCount = msg.client.guilds.cache.map((Guild) => Guild.id).length
            let memberNumber = 0;

            for (memberCountNumber of membersCount) {
                memberNumber += memberCountNumber
            }

            defaultEmbed(msg)
                .setTitle("🧾 | Commands list")
                .setDescription(`\`\`\` MY PREFIX IS ${prefix} \n I'm on ${serversCount} servers with ${memberNumber} players \`\`\` `)
            for (command of commands.map((cmd) => cmd.name)) {
                let cmd = commands.get(command)
                defaultEmbed(msg)
                    .addField(`${cmd.name.toUpperCase()}:`, `${cmd.description}`)
            }
            defaultEmbed(msg)
                .addField(`\u200B`, `\u200B`)
                .addField(`**Add bot to your server!**`, `[Click me!](${botinviteUrl})`)
            return channel.send(defaultEmbed(msg))
            // .then(() => {
            //     if (msg.channel.type === "dm") return
            //     msg.reply("📄 | **I've sent a list of command on dm!**")
            // })
            // .catch(err => {
            //     console.error(`Couldn't send dm to ${msg.author.tag}\n`, err)
            //     msg.reply("❌ | It seems I can't dm you! Do you have DMs disabled?")
            // })

        }

        const cmdName = args[0].toLowerCase()
        const cmd = commands.get(cmdName) || commands.find((c) => c.aliases && c.aliases.includes(cmdName))
        if (!cmd) {
            return channel.send(`❌ | Command \`${cmdName}\` doesn't exist`)
            // .then(msg =>{
            //     msg.delete({timeout:2000})
            // })
        }
        // waitingEmbed
        //     .setTitle(`Command | ${cmd.name.toUpperCase()}`)
        defaultEmbed(msg)
            .setTitle(`Command: ${cmd.name.toUpperCase()}`)
            .addField(`Description:`, `${cmd.description}`)
            .setThumbnail("https://pics.freeicons.io/uploads/icons/png/1841465761591557586-128.png")
        if (cmd.usage) {
            defaultEmbed(msg).addField(`Usage:`, `${prefix}${cmd.name} ${cmd.usage}`)
        }
        if (cmd.example) {
            defaultEmbed(msg).addField(`Example:`, `${prefix}${cmd.name} ${cmd.example}`)
        }
        if (cmd.cooldown) {
            defaultEmbed(msg).addField(`Cooldown:`, `${cmd.cooldown}s`)
        }
        if (cmd.aliases) {
            defaultEmbed(msg).addField('Aliases:', `${cmd.aliases.join(", ")}`)
        }
        if (cmd.botPermissions) {
            msgEmbed.addField("Bot permissions:", `\`${prefix}${cmdName} ${cmd.botPermissions}\``)
            //reply += `\nExample: \`${prefix}${cmdName} ${cmd.example}\``
        }
        if (cmd.rolesRequired) {
            msgEmbed.addField("Roles required:", `\`${prefix}${cmdName} ${cmd.rolesRequired}\``)
            //reply += `\nExample: \`${prefix}${cmdName} ${cmd.example}\``
        }

        channel.send(waitingEmbed().setTitle(`Command | ${cmd.name.toUpperCase()}`))
            .then(msg => {
                setTimeout(() => {
                    msg.edit(defaultEmbed(msg))
                }, waitingTime)
            })

    }
}