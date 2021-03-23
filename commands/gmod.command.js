
module.exports = {
    name: "gmod",
    description:"Sends link to a gmod collection!",
    cooldown: 5,
    run(msg){
        const msgContent = "https://steamcommunity.com/sharedfiles/filedetails/?id=2428289110"
        msg.author.send(msgContent)
    }
}