const maxVol = client.config.opt.maxVol;

module.exports = {
    name: 'volume',
    aliases: ['vol'],
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Şu anda müzik oynatılmıyor ${message.author}... tekrar dene ? ❌`);

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send(`Geçerli ses ${queue.volume} 🔊\n*Sesi değiştirmek için **1** ile **${maxVol}** arasında geçerli bir sayı girin.*`);

        if (queue.volume === vol) return message.channel.send(`Değiştirmek istediğiniz ses düzeyi zaten geçerli olan ses düzeyidir ${message.author}... tekrar dene ? ❌`);

        if (vol < 0 || vol > maxVol) return message.channel.send(`Belirtilen numara geçerli değil. **1** ile arasında bir sayı girin **${maxVol}** ${message.author}... tekrar dene ? ❌`);

        const success = queue.setVolume(vol);

        return message.channel.send(success ? `Ses şu şekilde değiştirildi: **${vol}**/**${maxVol}**% 🔊` : `Bir şeyler yanlış gitti ${message.author}... tekrar dene ? ❌`);
    },
};