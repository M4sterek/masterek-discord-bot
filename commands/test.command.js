
const {welcomeCanvas} = require(__dirname +"/../config/canvas/canvas.js")

const {createCanvas} = require("canvas");
const { MessageAttachment } = require("discord.js");
module.exports = {
    name: "test",
    description: "test command only for bot owner!",
    run(msg,args){
        
        welcomeCanvas(msg)

    }

}