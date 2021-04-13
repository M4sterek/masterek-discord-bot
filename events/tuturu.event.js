module.exports = {
    name: "message",
    run(msg) {
        const {
            author,
            channel
        } = msg
        const welcome = ["hi", "hello", "ohayo"]
        const message = msg.content
            .trim()
            .split(/ +/g)
        if (author.bot) return
        if(message.some(msg => welcome.includes(msg.toLowerCase()))){
            channel.send(`**TUTURU! HI** <@${msg.member.id}>`)
        }


    }

}