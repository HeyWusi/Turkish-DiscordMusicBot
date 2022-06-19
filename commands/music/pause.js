module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`Şu anda müzik oynatılmıyor ${message.author}... tekrar dene ? ❌`);

        const success = queue.setPaused(true);

        return message.channel.send(success ? `Mevcut müzik ${queue.current.title} durduruldu ✅` : `Bir şeyler yanlış gitti ${message.author}... tekrar dene ? ❌`);
    },
};