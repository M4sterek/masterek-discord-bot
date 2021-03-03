

module.exports = {
    name: "ping",
    description: "Pings the bot!",
    run(msg) {
        const {
            client
        } = msg;
        let latency = Date.now() - msg.createdTimestamp
        const ping = client.ws.ping
        msg.channel.send(`🏓 | L pong! **${latency}** ms.`);
        msg.channel.send(`💻 | ApiLatency:! **${ping}** ms.`);

    }

}