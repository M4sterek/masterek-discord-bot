
module.exports = {
    name: "ping",
    category: "other",
    description: "Pings the bot!",
    run(msg) {
        const {
            client,
            channel
        } = msg;
        let latency = Date.now() - msg.createdTimestamp
        const ping = client.ws.ping
        channel.send(`🏓 | L pong! **${latency}** ms.`);
        channel.send(`💻 | ApiLatency:! **${ping}** ms.`);

    }

}