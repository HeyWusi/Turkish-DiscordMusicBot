const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: ['sh'],
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Lütfen geçerli bir arama girin ${message.author}... tekrar dene ? ❌`);

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`Sonuç bulunamadı ${message.author}... tekrar dene ? ❌`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setAuthor(`İçin sonuçlar ${args.join(' ')}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. **${track.title}** | ${track.author}`).join('\n')}\n\n1 ile **${maxTracks.length}** arasında seçim yapın ya da **iptal edin** ⬇️`);

        embed.setTimestamp();
        embed.setFooter('Made with by Wusi 💜', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'iptal') return message.channel.send(`Arama iptal edildi ✅`) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`Invalid response, try a value between **1** and **${maxTracks.length}** or **cancel**... tekrar dene ? ❌`);

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                return message.channel.send(`Ses kanalına katılamıyorum ${message.author}... tekrar dene ? ❌`);
            }

            await message.channel.send(`Aramanız yükleniyor... 🎧`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'zaman') return message.channel.send(`Arama zaman aşımına uğradı ${message.author}... tekrar dene ? ❌`);
        });
    },
};