
module.exports = {
    name: "gmod",
    category: "other",
    description:"Sends link to a gmod collection!",
    cooldown: 5,
    run(msg){
        const {channel} = msg
        const msgContent = "https://steamcommunity.com/sharedfiles/filedetails/?id=2428289110"
        msg.author.send(msgContent)
            .catch(error=>{
                console.log(error)
                channel.send("I cannot send a dm to you!")
            })
        if(channel.type="dm") return
        msg.channel.send("Link to gmod collection has been sent on dm!")
        
        
    }
}