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
        //const data = [];
        let botinviteUrl = "https://discord.com/api/oauth2/authorize?client_id=691785599912509440&permissions=8&scope=bot"
        const helpEmbed = new MessageEmbed().setColor(3066993)
        const waitingEmbed = new MessageEmbed().setColor(15844367)


        if (!args.length) {
            //data.push(commands.map((cmd) => cmd.name).join(", "))
            helpEmbed
                .setTitle("🧾 | Commands list")
                .setDescription(`\`MY PREFIX IS ${prefix} \` `)
            for (command of commands.map((cmd) => cmd.name)) {
                let cmd = commands.get(command)
                helpEmbed
                    .addField(`${cmd.name.toUpperCase()}:`, `${cmd.description}`)
            }
            helpEmbed
            .addField(`\u200B`, `\u200B`)
            .addField(`**Add bot to your server!**`,`[Click me!](${botinviteUrl})` )
            return msg.channel.send(helpEmbed)
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
            return msg.channel.send(`❌ | Command \`${cmdName}\` doesn't exist`)
            // .then(msg =>{
            //     msg.delete({timeout:2000})
            // })
        }
        waitingEmbed
            .setTitle(`Command | ${cmd.name.toUpperCase()}`)
        helpEmbed
            .setTitle(`Command: ${cmd.name.toUpperCase()}`)
            .addField(`Description:`, `${cmd.description}`)
            .setThumbnail("https://pics.freeicons.io/uploads/icons/png/1841465761591557586-128.png")
        if (cmd.usage) {
            helpEmbed.addField(`Usage:`, `${prefix}${cmd.name} ${cmd.usage}`)
        }
        if (cmd.example) {
            helpEmbed.addField(`Example:`, `${prefix}${cmd.name} ${cmd.example}`)
        }
        if (cmd.cooldown) {
            helpEmbed.addField(`Cooldown:`, `${cmd.cooldown}s`)
        }
        if (cmd.aliases) {
            helpEmbed.addField('Aliases:', `${cmd.aliases.join(", ")}`)
        }
        msg.channel.send(waitingEmbed)
            .then(msg => {
                setTimeout(() => {
                    msg.edit(helpEmbed)
                }, waitingTime)
            })

    }
}