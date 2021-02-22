const {MessageEmbed, Collection} = require('discord.js')
const {prefix} = require(__dirname+"/../config/config.js")


module.exports = {
    name: "help",
    description: "Show commands!",
    args: true,
    usage: "[command]",
    example: "clear",
    run(msg,args){
        const {commands} = msg.client
        const data = [];
        if(!args.lenght){
            data.push("There's list of commands")
            data.push(commands.map((cmd) => cmd.name).join(", "))
            return msg.author.send(data)
            .then(()=>{
                if(msg.channel.type==="dm") return
                 msg.channel.send("📄 | **I've sent a list of command on dm!**")
            })
            .catch(err =>{
                console.error(`Couldn't send dm to ${msg.author.tag}\n`, err)
                msg.reply("❌ | It seems I can't dm you! Do you have DMs disabled?")
            })
        
        }
        
        const cmdName = args[0].toLowerCase()
        const cmd = commands.get(cmdName) || commands.find(c => c.aliases && c.aliases.include(cmdName))
        if(!cmd){
            msg.channel.send("❌ | Command doesn't exist")
        
        }
        
    }
}