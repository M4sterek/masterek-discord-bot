const {
    queue
} = require(__dirname + "/../config/config.js")
module.exports = {
    name:"voiceStateUpdate",
    run(oldState, newState){
    const newChannelId = newState.channel
    if(newState.member.id!=="691785599912509440") return
    if(newChannelId === null){
         queue.delete(newState.member.guild.id)
     }

    }
}