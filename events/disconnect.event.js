module.exports = {
    name:"voiceStateUpdate",
    run(oldMember, newMember){
        console.log(oldMember)
    const oldChannelId = oldMember.channelID
    const newChannelId = newMember.channelID
    if(oldChannelId === undefined && newChannelId !== undefined) {

        console.log('joined')
     } else if(newChannelId === undefined){
   
       console.log('left')
   
     }

    }
}