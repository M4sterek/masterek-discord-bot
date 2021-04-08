const {
    Permissions: {
        FLAGS
    }
} = require("discord.js")
const { CommitStats } = require("git")
module.exports = {
    name: "test",
    description: "test!",
    rolesRequired: [],
    botPermissions: [],
    userPermissions: [],
    run(msg, args) {
        // const distube = new DisTube(msg.client,{searchSongs:true, emitNewSongOnly:true})
        // distube.play(msg,args.join(" "))
        // //welcomeCanvas(msg.client,msg.member,msg)
        // const playersArray = msg.guild.members.cache.map(players => players.user).filter(item => item !== null && item.bot !== true )
        // console.log(playersArray)
        const {
            member,
            channel,
            client
        } = msg
        const voiceChannel = member.voice.channel
        if (!voiceChannel) {
            return channel.send("You must be in voice channel!")
        }
        if (!voiceChannel.joinable){
            return channel.send("I cannot join into your channel! Maybe I need more permisssions!")
        }
        voiceChannel.join()
            .then(()=>{
                channel.send(`Joined in **${channel.name}**`)
            })
            .catch(console.error())
        const broadcast = client.voice.createBroadcast()
        const playAudio = broadcast.play("http://www.sample-videos.com/audio/mp3/wave.mp3", { volume: 0.5 })
        const voiceChannelConnection = client.voice.connections
        console.log(voiceChannelConnection)
        // let pepoG = client.emojis.cache.find(emoji => emoji.name === "pepoG")
        // console.log(pepoG)
        // msg.channel.send(pepoG.toString())


    }

}