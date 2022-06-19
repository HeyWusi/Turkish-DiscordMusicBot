module.exports = {
    name: 'clear',
    aliases: ['cq'],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Şu anda müzik oynatılmıyor ${message.author}... tekrar dene ? ❌`);

        if (!queue.tracks[0]) return message.channel.send(`Şu an oynatılan müzikten sonra oynatılacak bir müzik yok ${message.author}... tekrar dene ? ❌`);

        await queue.clear();

        message.channel.send(`Sıra temizlendi 🗑️`);
    },
};