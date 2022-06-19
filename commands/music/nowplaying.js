const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Şu anda müzik oynatılmıyor ${message.author}... tekrar dene ? ❌`);

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor(track.title, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        embed.setDescription(`Ses **${queue.volume}**%\nSüre **${trackDuration}**\nLoop modu **${methods[queue.repeatMode]}**\ntarafından eklendi${track.requestedBy}`);

        embed.setTimestamp();
        embed.setFooter('Made with by Wusi 💜', message.author.avatarURL({ dynamic: true }));

        const saveButton = new MessageButton();

        saveButton.setLabel('Parçayı kaydet');
        saveButton.setCustomId('saveTrack');
        saveButton.setStyle('BAŞARILI');

        const row = new MessageActionRow().addComponents(saveButton);

        message.channel.send({ embeds: [embed], components: [row] });
    },
};