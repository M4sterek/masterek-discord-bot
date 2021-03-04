const chalk = require("chalk")
const {prefix} = require(__dirname+"/../config/config.js")
module.exports = (client) => {
    client.on('ready', () => {
        console.log(chalk.red('<============================================>'))
        console.log(chalk.red('Logged in as',client.user.tag))
        console.log(chalk.red('<============================================>'))
        client.user.setActivity(`LAWLIET ${prefix}help`, {type: 'STREAMING'})
      
      });
}
