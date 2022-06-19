module.exports = {
    name: 'save',
    aliases: ['sv'],
    utilisation: '{prefix}save',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Şu anda müzik oynatılmıyor ${message.author}... tekrar dene ? ❌`);

        message.author.send(`Parçayı kaydettin **${queue.current.title}** ✅`).then(() => {
            message.channel.send(`Müziğin adı DM'den gönderildi ✅`);
        }).catch(error => {
            message.channel.send(`Size DM'den mesaj gönderilemiyor ${message.author}... tekrar dene ? ❌`);
        });
    },
};