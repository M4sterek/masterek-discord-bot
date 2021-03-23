const { MessageEmbed } = require("discord.js")

const {
    randomInt
} = require(__dirname + "/../functions/random.function.js")
const {prefix} = require(__dirname + "/../config/config.js")
module.exports = {
    name: "quiz",
    description: "QUIZ!",
    usage: "[anime]",
    example: "quiz",
    guildOnly: true,
    cooldown: 5,
    async run(msg, args) {
        const {
            channel
        } = msg
        const filter = (response) => {
            return response.author.id === msg.author.id
        }

        const quiz = require(__dirname + "/../quiz/quiz-1.json")
        let randomInteger = randomInt(0, quiz.length - 1)
        let question = quiz[randomInteger].question
        let answer = quiz[randomInteger].answer
        const questionEmbed = new MessageEmbed()
        .setAuthor("QUESTION", msg.author.displayAvatarURL())
        .setFooter(`You have 30s to answer! | type ${prefix}cancel to cancel`, msg.author.displayAvatarURL())
        .setColor(3447003)
        .addField(question,`\u200B`)
        .addField(`\u200B`,`\u200B`)
        if(quiz[randomInteger].questionImage){
            questionEmbed.setImage(quiz[randomInteger].questionImage)
        }
        channel.send(questionEmbed)
            .then(() => {
                channel.awaitMessages(filter, {
                        max: 1,
                        time: 30000,
                        errors: ["time"]
                    })
                    .then(collected => {
                        if (!answer.includes(collected.first().content.toLowerCase())){
                            return channel.send("WRONG ANSWER")
                        }
                        channel.send("YES!")    
                    })
                    .catch(error =>{
                        console.log(error)
                        channel.send("TIME RUNNED UP")
                    })
   
            })
    }
}