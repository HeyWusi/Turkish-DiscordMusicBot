const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Şu anda müzik oynatılmıyor ${message.author}... tekrar dene ? ❌`);

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send(`Loop modunda önce mevcut müziği devre dışı bırakmalısınız. (${client.config.app.px}loop) ${message.author}... tekrar dene ? ❌`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Repeat modu **${queue.repeatMode === 0 ? 'devredışı' : 'etkin'}** tüm sıra durmadan tekrarlanacak 🔁` : `Something went wrong ${message.author}... tekrar dene ? ❌`);
        } else {
            if (queue.repeatMode === 2) return message.channel.send(`Loop modunda önce mevcut sırayı devre dışı bırakmalısınız. (${client.config.app.px}loop sırası) ${message.author}... tekrar dene ? ❌`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Repeat modu **${queue.repeatMode === 0 ? 'devredışı' : 'etkin'}** mevcut müzik durmadan tekrarlanacak (<queue> seçeneği ile sırayı döngüye alabilirsiniz.) 🔂` : `Something went wrong ${message.author}... tekrar dene ? ❌`);
        };
    },
};