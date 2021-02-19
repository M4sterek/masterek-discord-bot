const {Client, MessageEmbed} = require('discord.js')
const config = require('./config/config.js')
const commandHandler = require('./handlers/command.handler.js')
const client = new Client()
const chalk = require("chalk")
require("dotenv").config()

// Token
const token = process.env.BOT_TOKEN
//Initialize Handler
commandHandler(client)
client.login(token)



client.on('ready', () => {
  console.log(chalk.red('<============================================>'))
  console.log(chalk.red('Logged in as',client.user.tag))
  console.log(chalk.red('<============================================>'))
});



