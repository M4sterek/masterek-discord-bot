
module.exports = {
    name: "clear",
    description: "Clears chat!",
    args: true,
    qargs: 1,
    usage: "<amount>",
    example: "5",
    guildOnly: true,
    cooldown: 5,
    aliases: ["purge"],
    run(msg, args){

        const {channel} = msg;
        const amount = parseInt(args[0])
        if(!Number.isInteger(amount)){
            return channel.send("You must specify amount to clear!")
        }
        if (amount>=100){
            amount=99;
        }
        if (amount<1 || amount>99){
            return channel.send("**The amount must be between 1<=>99!**")
        }

        channel.bulkDelete(amount + 1)
        channel.send(`Cleared ${amount} messages!`)  
        .then(msg => {
            msg.delete({ timeout: 3000})
        })
        .catch(console.error);
        
        

    }
}