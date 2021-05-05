const {Permissions: {FLAGS}} = require('discord.js')
module.exports = {
    name: "bigtext",
    description: "Exchange the letter with big emotes!",
    category: "fun",
    cooldown: 10,
    args: true,
    usage: "[some text]",
    example: "ABC",
    aliases: ["emojify"],
    userPermissions:[FLAGS.ADMINISTRATOR],
    run(msg, args) {
        const {
            channel,
            content 
        } = msg
        let bigtext = ""
        if(content.length > 2000){
            return channel.send("Argument must be 2000 or fewer in length")
        }
        for (let word of args) {
            let words = ""
            let charsArray = word.toLowerCase().split('')
            for (let char of charsArray) {
                const regex = /[a-z1-9|10]/g
                if (!char.match(regex)) {
                    words += char
                }
                if (!isNaN(char)) {
                    const numbersInWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
                    let number = parseInt(char)
                    words += `:${numbersInWords[number]}: `
                }
                if (isNaN(char) && char.match(regex)) {
                    words += `:regional_indicator_${char}: `
                }
            }
            bigtext += `${words}  `
        }
        if(bigtext.length > 2000) return
        channel.send(bigtext)
            .catch(console.error())
    }
}