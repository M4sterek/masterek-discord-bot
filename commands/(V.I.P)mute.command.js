
// module.exports = {
//     name: "mute",
//     description: "Mute player!",
//     args: true,
//     qargs: 1,
//     usage: "<player.id>",
//     example: "@Example#2332",
//     guildOnly: true,
//     run(msg, args){
//         const {member, channel} = msg
//         const mutedRole = msg.guild.roles.cache.get('808363924902248488')
//         const memberMuted = msg.mentions.members.first()
//         console.log(memberMuted)
        
//         if(!mutedRole){
//             return channel.send("There is not **muted** role!")
//         }
        
//         if(memberMuted === member){
//             return channel.send("You cannot mute yourself!")
//         }
//         if(memberMuted.roles.highest.position >= member.roles.highest.position){
//             return channel.send("You cannot mute user that has higher or equal role to you!")
//         }
//         if(memberMuted.roles.cache.has(mutedRole.id)){
//             return channel.send("This user is already muted!")
//         }
        
//         try{
//             memberMuted.roles.add(mutedRole)
//         }catch(error){
//             channel.send("**ERROR**")
//         }

//     }
    
// }
