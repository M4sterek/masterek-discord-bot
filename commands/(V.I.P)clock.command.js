// module.exports = {
//     name: "clock",
//     description: "Clock!",
//     async run(msg){
//         const {guild, channel} = msg
//         const timeNow = new Date().toLocaleTimeString().slice(0,5)
//         const channelName = `Time: ${timeNow}`

//         const createdChannel = await guild.channels.create(channelName,{type: "voice"})
//         if(createdChannel){
//             const channelId = createdChannel.id
//             setInterval(() =>{
//                 const timeNow2 = new Date().toLocaleTimeString()
//                 const channelName2 = `Time: ${timeNow2}`
//                 guild.channels.resolve(channelId).setName(channelName2)
//             }, 3000)
//         }





//     }

// }