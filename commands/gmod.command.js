
module.exports = {
    name: "gmod",
    category: "other",
    description:"Sends link to a gmod collection!",
    cooldown: 5,
    run(msg){
        const {channel} = msg
        const msgContent = "https://steamcommunity.com/sharedfiles/filedetails/?id=2428289110"
        msg.author.send(msgContent)
            .then(()=>{
                if(msg.channel.type==="dm ") return
                msg.channel.send("Link to gmod collection has been sent on dm!")
            })
            .catch(error=>{
                console.error(error)
                msg.reply("I cannot send a dm to you!")
            })
    }
}