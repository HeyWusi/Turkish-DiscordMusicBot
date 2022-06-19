const ms = require('ms');

module.exports = {
    name: 'seek',
    aliases: [],
    utilisation: '{prefix}seek [time]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Şu anda müzik oynatılmıyor ${message.author}... tekrar dene ? ❌`);

        const timeToMS = ms(args.join(' '));

        if (timeToMS >= queue.current.durationMS) return message.channel.send(`Belirtilen süre, geçerli şarkının toplam süresinden daha fazla ${message.author}... tekrar dene ? ❌\n*Örneğin **5s, 10s, 20 saniye, 1dk**...* gibi geçerli bir süre deneyin`);

        await queue.seek(timeToMS);

        message.channel.send(`Geçerli şarkıda ayarlanan süre **${ms(timeToMS, { long: true })}** ✅`);
    },
};