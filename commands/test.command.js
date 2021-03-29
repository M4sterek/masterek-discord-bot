
const {welcomeCanvas} = require(__dirname+"/../canvas/canvas.js")
const {Permissions:{FLAGS}} = require("discord.js")
const {randomInt} = require(__dirname+"/../functions/random.function.js")
module.exports = {
    name: "gulag",
    description: "gulag!",
    rolesRequired: [],
    botPermissions:[],
    userPermissions:[],
    run(msg,args){
        // const distube = new DisTube(msg.client,{searchSongs:true, emitNewSongOnly:true})
        // distube.play(msg,args.join(" "))
        // //welcomeCanvas(msg.client,msg.member,msg)
        const playersArray = msg.guild.members.cache.map(players => players.user).filter(item => item !== null && item.bot !== true )
        console.log(playersArray)
        
    }

}