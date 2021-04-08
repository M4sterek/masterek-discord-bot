const {
    MessageEmbed,
    Collection
} = require('discord.js')
const {
    prefix,
    waitingTime
} = require(__dirname + "/../config/config.js")
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
            const helpEmbed = new MessageEmbed()

            let memberNumber = 0;
            for (memberCountNumber of membersCount) {
                memberNumber += memberCountNumber
            }

            helpEmbed
                .setColor(3066993)
                .setTitle("🧾 | Commands list")
                .setDescription(`\`\`\` MY PREFIX IS ${prefix} \n I'm on ${serversCount} servers with ${memberNumber} players \`\`\` `)

            for (command of commands.map((cmd) => cmd.name)) {
                let cmd = commands.get(command)
                helpEmbed
                    .addField(`${cmd.name.toUpperCase()}:`, `${cmd.description}`)
            }
            helpEmbed
                .addField(`\u200B`, `\u200B`)
                .addField(`**Add bot to your server!**`, `[Click me!](${botinviteUrl})`)
            return channel.send(helpEmbed)
        }

        const cmdName = args[0].toLowerCase()
        const cmd = commands.get(cmdName) || commands.find((c) => c.aliases && c.aliases.includes(cmdName))
        if (!cmd) {
            return channel.send(`❌ | Command \`${cmdName}\` doesn't exist`)
        }
        let data = []
        const helpCommandEmbed = new MessageEmbed()
        helpCommandEmbed
            .setColor(3066993)
            .setTitle(`Command: \`${cmd.name.toUpperCase()}\``)
        if(cmd.description){
            data.push(`**Description:** ${cmd.description}`)
        }
        if (cmd.usage) {
            data.push(`**Usage:** \`\`\`${prefix}${cmd.name} ${cmd.usage}\`\`\``)
        }
        if (cmd.example) {
            data.push(`**Example:** \`\`\`${prefix}${cmd.name} ${cmd.example}\`\`\``)
        }
        if (cmd.cooldown) {
            data.push(`**Cooldown:** ${cmd.cooldown}s`)
        }
        if (cmd.aliases && cmd.aliases.length) {
            data.push(`**Aliases:** \`\`\`${cmd.aliases.join(", ")}\`\`\``)
        }
        if (cmd.botPermissions && cmd.botPermissions.length) {
            data.push(`**Bot permissions:** \`\`\`${cmd.botPermissions}\`\`\``)
            //reply += `\nExample: \`${prefix}${cmdName} ${cmd.example}\``
        }
        if (cmd.userPermissions && cmd.userPermissions.length) {
            data.push(`**Bot permissions:** \`\`\`${cmd.userPermissions}\`\`\``)
            //reply += `\nExample: \`${prefix}${cmdName} ${cmd.example}\``
        }
        if (cmd.rolesRequired && cmd.rolesRequired.length) {
            data.push(`**Roles required:** \`\`\`${cmd.rolesRequired}\`\`\``)
            //reply += `\nExample: \`${prefix}${cmdName} ${cmd.example}\``
        }
        helpCommandEmbed
            .setDescription(data)
        const helpWaitingEmbed = new MessageEmbed()
            .setColor(15844367)
            .setDescription("Waiting for data...")
            .setTitle("Waiting")
        channel.send(helpWaitingEmbed.setTitle(`Command | ${cmd.name.toUpperCase()}`))
            .then(msg => {
                setTimeout(() => {
                    msg.edit(helpCommandEmbed)
                }, waitingTime)
            })

    }
}