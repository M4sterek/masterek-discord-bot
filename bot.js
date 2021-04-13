const {
  Client,
  MessageEmbed
} = require('discord.js')
const {
  prefix,
  token
} = require('./config/config.js')
const commandHandler = require('./handlers/command.handler.js')
const eventHandler = require("./handlers/events.handler")
const chalk = require('chalk')
const client = new Client()
// Initialize Command Handler
commandHandler(client)
// Initialize Events Handler
eventHandler(client)
// Login
client.login(token)
// Client is ready
client.on('ready', () => {
  console.log(chalk.red('<============================================>'))
  console.log(chalk.red('Logged in as', client.user.tag))
  console.log(chalk.red('<============================================>'))
  client.user.setActivity(`Alchemy || ${prefix}help`, {
    type: 'PLAYING'
  })
})