const {waitingTime} = require(__dirname+"/../config/config.js")
const {Permissions: {FLAGS}} = require('discord.js')

module.exports = {
    name: "clear",
    category: "other",
    description: "Clears chat!",
    args: true,
    usage: "<amount>",
    example: "5",
    guildOnly: true,
    cooldown: 5,
    aliases: ["purge"],
    userPermissions:[FLAGS.ADMINISTRATOR],
    run(msg, args) {

        const {
            channel
        } = msg;
        let amount = parseInt(args[0])
        if (!Number.isInteger(amount)) {
            return channel.send("You must specify amount to clear!")
        }
        if (amount > 99) {
            amount = 99;
        }
        if (amount < 1) {
            return channel.send("**The amount must be between 1<=>99!**")
        }

        channel.bulkDelete(amount + 1)
        channel.send(`Cleared ${amount} messages!`)
            .then(msg => {
                msg.delete({
                    timeout: waitingTime
                })
            })
            .catch(console.error);



    }
}