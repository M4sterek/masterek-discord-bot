
const {welcomeCanvas} = require(__dirname +"/../config/canvas/canvas.js")

const {createCanvas} = require("canvas");
const { MessageAttachment } = require("discord.js");
module.exports = {
    name: "test",
    description: "test command only for bot owner!",
    run(msg,args){
        if(!msg.author.id==="272656648747876352") return

        welcomeCanvas(msg.client,msg.member,msg)

    }

}