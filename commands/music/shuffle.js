module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    utilisation: '{prefix}shuffle',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Şu anda müzik oynatılmıyor ${message.author}... tekrar dene ? ❌`);

        if (!queue.tracks[0]) return message.channel.send(`Mevcut müzikten sonra sırada parça yok ${message.author}... tekrar dene ? ❌`);

        await queue.shuffle();

        return message.channel.send(`Sıra karıştırıldı **${queue.tracks.length}** şarkı(lar) ! ✅`);
    },
};