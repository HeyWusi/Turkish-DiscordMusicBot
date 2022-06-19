const ms = require('ms');

module.exports = {
    name: 'ping',
    aliases: [],
    utilisation: '{prefix}ping',

    execute(client, message) {
        message.channel.send(`Hesaplanan son kalp atışı ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} önce **${client.ws.ping}ms** 🛰️`);
    },
};