const {Client, MessageEmbed} = require('discord.js')
const config = require('./config/config.js')
const commandHandler = require('./handlers/command.handler.js')
const events = require("./events/client.on")
const client = new Client()

require("dotenv").config()


//Initialize Handler
commandHandler(client)
events(client)

client.login(config.token)







