module.exports = {
    name: 'back',
    aliases: ['previous'],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Şu anda müzik oynatılmıyor ${message.author}... tekrar dene ? ❌`);

        if (!queue.previousTracks[1]) return message.channel.send(`Bundan önce şarkı eklenmemiş  ${message.author}... tekrar dene ? ❌`);

        await queue.back();

        message.channel.send(`**Önceki** şarkı oynatılıyor ✅`);
    },
};