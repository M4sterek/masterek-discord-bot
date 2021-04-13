const {
    Permissions: {
        FLAGS
    }
} = require("discord.js")
const path = require('path');
module.exports = {
    name: "test",
    category: "other",
    description: "test!",
    rolesRequired: [],
    botPermissions: [],
    userPermissions: [],
    async run(msg, args) {
        // const distube = new DisTube(msg.client,{searchSongs:true, emitNewSongOnly:true})
        // distube.play(msg,args.join(" "))
        // //welcomeCanvas(msg.client,msg.member,msg)
        // const playersArray = msg.guild.members.cache.map(players => players.user).filter(item => item !== null && item.bot !== true )
        // console.log(playersArray)

        // let pepoG = client.emojis.cache.find(emoji => emoji.name === "pepoG")
        // console.log(pepoG)
        // msg.channel.send(pepoG.toString())


    }

}