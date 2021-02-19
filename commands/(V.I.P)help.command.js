const {MessageEmbed, Collection} = require('discord.js')
const {prefix} = require(__dirname+"/../config/config.js")


module.exports = {
    name: "help",
    description: "Show commands!",
    usage: "[command]",
    example: "clear",
    run(msg,args){
        const {commands} = msg.client
        const data = [];
        if(!args.lenght){
            data.push("There's list of commands")
            data.push(commands.map((cmd) => cmd.name).join(", "))
        }
        msg.author.send(data)
        .then(()=>{
            if(msg.channel.type==="dm") return
            msg.channel.send("📄 | **I've sent a list of command on dm!**")

        })
        
    }
}