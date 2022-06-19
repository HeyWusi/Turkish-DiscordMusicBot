const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`Şu anda müzik oynatılmıyor ${message.author}... tekrar dene ? ❌`);

        if (!queue.tracks[0]) return message.channel.send(`Mevcut müzikten sonra sırada parça yok ${message.author}... tekrar dene ? ❌`);

        const embed = new MessageEmbed();
        const methods = ['', '🔁', '🔂'];

        embed.setColor('RED');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor(`Sunucu sırası - ${message.guild.name} ${methods[queue.repeatMode]}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - **${track.title}** | ${track.author} (tarafından eklendi : ${track.requestedBy.username})`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `Ve **${songs - 5}** diğer şarkı(lar)...` : `Playlistte **${songs}** şarkı(lar)...`;

        embed.setDescription(`Current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();
        embed.setFooter('Made with by Wusi 💜', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });
    },
};