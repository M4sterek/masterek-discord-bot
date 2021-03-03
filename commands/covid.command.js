const {
    MessageEmbed
} = require('discord.js')
const {
    waitingTime
} = require(__dirname + "/../config/config.js")
const fetch = require('node-fetch')
const {
    list
} = require('pm2')
module.exports = {
    name: "covid",
    description: "Sends info about covid stats!",
    usage: "<global|list|country>",
    args: true,
    example: "Poland",
    cooldown: 5,
    guildOnly: true,
    aliases: ["cov"],
    async run(msg, args) {
        const covidEmbed = new MessageEmbed().setColor(3066993)
            .setImage("https://pics.freeicons.io/uploads/icons/png/2485005581599778124-256.png")
        const waitingEmbed = new MessageEmbed().setColor(15844367)
        .setTitle("Waiting")
        .setDescription("Waiting for data...")
        // if (args[0] === "list") {
        //     const listEmbed = new MessageEmbed().setTitle("Countries")
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
        // }
        if (args[0] === "global") {

            let url = "https://api.covid19api.com/world/total"
            let response = await fetch(url)
            let json = await response.json()

            let confirmed = json.TotalConfirmed
            let deaths = json.TotalDeaths
            let recovered = json.TotalRecovered

            covidEmbed
                .setTitle("ewew | Global")
                .addField(confirmed, "Confirmed")
                .addField(deaths, "Confirmed")
                .addField(recovered, "Confirmed")
            return msg.channel.send(waitingEmbed).then(msg => {
                setTimeout(() => msg.edit(covidEmbed), waitingTime)
            }, )

        }



        let country = args[0]


        let url = `https://api.covid19api.com/country/${country}`
        let response = await fetch(url)
        let json = await response.json()

        const countryArray = json[json.length - 1]
        const countryCode = countryArray.CountryCode.toLowerCase()

        waitingEmbed
            .setTitle(`:flag_${countryCode}: | ${countryArray.Country}`)
            .setDescription("Waiting for data...")

        covidEmbed
            .setTitle(`:flag_${countryCode}: | ${countryArray.Country}`)
            .setThumbnail(`https://www.countryflags.io/${countryCode}/flat/64.png`)
            .addField(countryArray.Confirmed, "Confirmed")
            .addField(countryArray.Deaths, "Deaths")
            .addField(countryArray.Recovered, "Recovered")
            .addField(countryArray.Active, "Active")
            .setFooter(`Statistics on: ${countryArray.Date}`, '');
            
        msg.channel.send(waitingEmbed)
            .then(msg => {
                setTimeout(() => {
                    msg.edit(covidEmbed)

                }, waitingTime)
            })

    }
}