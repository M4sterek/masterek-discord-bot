module.exports = {
    name: "kick",
    description: "Kicks mentioned member!",
    usage: "[nick] <reason>",
    args: true,
    example: "@MasterekQ#2733 Being toxic",
    cooldown: 5,
    guildOnly: true,
    rolesRequired: [],
    run(msg, args) {
        const {
            author,
            mentions,
            channel,
            client
        } = msg
        const memberToKick = mentions.members.first()
        const reason =[...args].slice(1).join(" ")
        if(!memberToKick){
            return channel.send("❌ | You must provide user to kick!")
        }
        if(memberToKick.id === author.id){
            return channel.send("❌ | You can't kick yourself!")
        }
        if(memberToKick.id === client.user.id){
            return channel.send("❌ | You can't kick me!")
        }
        if(!memberToKick.kickable){
            return channel.send("❌ | I can't kick mentioned user, maybe higher rank required!")
        }

        memberToKick.kick(reason).then(kickedMember => {
            kickedMember.send
            channel.send(`Kicked: ${kickedMember.nickname} \n ${reason ? `Reason${reason}` : " "}`)
        })
    }
}