module.exports = {
    name: 'skip',
    aliases: ['sk'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Şu anda müzik oynatılmıyor ${message.author}... tekrar dene ? ❌`);

        const success = queue.skip();

        return message.channel.send(success ? `Mevcut müzik ${queue.current.title} geçildi ✅` : `Bir şeyler yanlış gitti ${message.author}... tekrar dene ? ❌`);
    },
};