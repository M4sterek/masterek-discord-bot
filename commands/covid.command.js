const {MessageEmbed} = require('discord.js')
const fetch = require('node-fetch')
module.exports = {
    name: "covid",
    description: "Sends info about covid stats",
    usage: "<global|list|country>",
    args: true,
    example: "Poland",
    cooldown: 5,
    guildOnly: true,
    aliases: ["cov","kowid","zaraza"],
    async run(msg, args) {

        // if (args[0] === "list") {
        //     const data = []

        //     let url = "https://api.covid19api.com/countries"
        //     let response = await fetch(url)
        //     let json = await response.json()
        //     for (const country of json) {
        //         data.push(country.Country)
        //     }
        //     const dataCountry = []
        //     dataCountry.push("There's list of country")
        //     dataCountry.push(data.join(", "))
        //     console.log(dataCountry)
        // }
        const covidEmbed = new MessageEmbed().setColor(3066993)
        
        let country = args[0]
        let url = `https://api.covid19api.com/country/${country}`
        let json
        try {
            let response = await fetch(url)
             json = await response.json()
        } catch (error) {
            console.log(error)
        }
        const countryArray = json[json.length - 1]
        const countryCode = countryArray.CountryCode.toLowerCase()
        covidEmbed
        .setTitle(`:flag_${countryCode}: | ${countryArray.Country}`)
        .setThumbnail(`https://www.countryflags.io/${countryCode}/flat/64.png`)
        .setImage("https://pics.freeicons.io/uploads/icons/png/2485005581599778124-512.png")
        .addField(countryArray.Confirmed,"Confirmed")
        .addField(countryArray.Deaths,"Deaths")
        .addField(countryArray.Recovered,"Recovered")
        .addField(countryArray.Active,"Active")
        .setFooter(`Statistics on: ${countryArray.Date}`, '');
        msg.channel.send(covidEmbed)
    }
}