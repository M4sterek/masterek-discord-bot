const chalk = require("chalk")
const {prefix} = require(__dirnam+"/../config/config.js")
module.exports = (client) => {
    client.on('ready', () => {
        console.log(chalk.red('<============================================>'))
        console.log(chalk.red('Logged in as',client.user.tag))
        console.log(chalk.red('<============================================>'))
        client.user.setActivity(`Use this -> ${prefix}help`, {type: 'STREAMING'})
      
      });
}
