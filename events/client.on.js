const chalk = require("chalk")
module.exports = (client) => {
    client.on('ready', () => {
        console.log(chalk.red('<============================================>'))
        console.log(chalk.red('Logged in as',client.user.tag))
        console.log(chalk.red('<============================================>'))
        client.user.setActivity(">>help", {type: 'STREAMING'})
      
      });
}
