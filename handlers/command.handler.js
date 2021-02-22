const {Collection} = require("discord.js")
const {prefix} = require(__dirname+"/../config/config.js")
const {readdirSync} = require("fs")

const ascii = require("ascii-table")

const table = new ascii().setHeading("Commands File","CMD", "Status")
module.exports = (client) => {

    
    
    client.commands = new Collection()
    const cooldowns = new Collection()

    const commandsFile = readdirSync(__dirname + "/../commands").filter((file) =>
        file.endsWith(".command.js")
    )
    
    
    for(const file of commandsFile){
        const cmd = require(__dirname + `/../commands/${file}`)
        if(cmd.name){
            client.commands.set(cmd.name, cmd)
            table.addRow(file,cmd.name,"✅")
        }else if(!cmd.name){
            table.addRow(file,cmd.name,"❌ -> missing name")
            continue;
        }
        else if(!cmd.description){
            table.addRow(file,cmd.name,"❌ -> missing description")
            continue;
        }
        }
        console.log(table.toString())  
        
        client.on('message', msg => {
            const {author, guild}=msg
            
            // Check if the message author is bot
                if(author.bot) return
                            
            // Check if the message starts with prefix(!)
                if(!msg.content.startsWith(prefix)) return
          
            // Parts a messages and print it in console
                const args = msg.content
                .slice(prefix.length)
                .trim()
                .split(/ +/g)
                
            
                const cmdName = args.shift().toLowerCase()
            
                const cmd = client.commands.get(cmdName) || client.commands.find(cmd =>cmd.aliases && cmd.aliases.includes(cmdName))
            // Check if command exist
                if(!cmd) return
            // Check if the message isn send on pm
                if(cmd.guildOnly && !guild){
                    return msg.reply("This command can't be executed inside DM!")
                }

            // Check if commands has args but they are not provided
                if(cmd.args && !args.length){
                    let reply = `You must specify argument, **${msg.author}**!`
                // Check if the command has usage
                    if(cmd.usage){
                        reply += `\nUsage: \`${prefix}${cmdName} ${cmd.usage}\``
                    }
                    if(cmd.example){
                        reply += `\nExample: \`${prefix}${cmdName} ${cmd.example}\``
                    }
                    return msg.channel.send(reply)
                }
                if(cmd.qargs && args.length>cmd.qargs){
                    let reply = "Too much args"
                    return msg.channel.send(reply)
                }
            
                if(!cooldowns.has(cmdName)){
                    cooldowns.set(cmdName, new Collection())
                }
                const now = Date.now()
                const timeStamps = cooldowns.get(cmdName)
                const cooldown = (cmd.cooldown || 5)*1000

                if(timeStamps.has(author.id)){
                    const expTime = timeStamps.get(author.id) + cooldown
                    if(now<expTime){
                        const timeLeft = (expTime-now)/1000
                        return msg.channel.send(`U need to wait **${timeLeft.toFixed(0)}s** to use this command!`)
                    } 
                }
                timeStamps.set(author.id,now)
                setTimeout(() =>{
                    timeStamps.delete(author.id)
                }, cooldown)
                try{
                    cmd.run(msg,args,client)
                }catch(error){
                    console.log(error)
                    msg.reply("there was an error")
            
            }
        }
        )}
