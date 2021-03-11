const {
    readdirSync
} = require("fs")
const ascii = require("ascii-table")
const chalk = require("chalk")
const {
    Constants: {
        Events
    }
} = require('discord.js')
module.exports = (client) => {
    const eventList = Object.values(Events)

    const table = new ascii().setHeading("Event file", "Event", "Status")

    const eventFiles = readdirSync(__dirname + "/../events").filter((file) =>
        file.endsWith(".event.js")
    )

    let eventRegisteredAmount = 0

    for (const file of eventFiles) {
        const event = require(__dirname + `/../events/${file}`)
        if (event.name && typeof event.run === "function") {
            table.addRow(file, event.name, "✅")
        } else if (!event.name) {
            table.addRow(file, event.name, "❌ -> missing name!")
        } else if (!event.run) {
            table.addRow(file, event.name, chalk.red("❌ -> missing run()!"))
            console.log(table.toString())
            process.exit(1)
        } else if (typeof event.run !== "function") {
            table.addRow(file, event.name, chalk.red("❌ -> run is not a function!"))
            console.log(table.toString())
            process.exit(1)
        }

        
        if (!eventList.includes(event.name)) {
            console.log(chalk.redBright(`Event: ${event.name} doesn't exists! \n in file: ./events/${file}`))
        }
        client.on(event.name, event.run) 
        eventRegisteredAmount++
    }
    console.log(table.toString())
    console.log(chalk.green(`Registered events: ${eventRegisteredAmount}`))
}