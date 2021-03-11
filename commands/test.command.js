
const {welcomeCanvas} = require(__dirname+"/../canvas/canvas.js")
const {Permissions:{FLAGS}} = require("discord.js")

module.exports = {
    name: "test",
    description: "test command only for bot owner!",
    rolesRequired: [],
    botPermissions:[],
    userPermissions:[],
    run(msg,args){
        welcomeCanvas(msg.client,msg.member,msg)

        
    }

}