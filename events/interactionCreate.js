module.exports = (client, int) => {
    if (!int.isButton()) return;

    const queue = player.getQueue(int.guildId);

    switch (int.customId) {
        case 'saveTrack': {
            if (!queue || !queue.playing) return int.reply({ content: `Şu anda müzik oynatılmıyor... tekrar dene ? ❌`, ephemeral: true, components: [] });

            int.member.send(`Parçayı kaydettin **${queue.current.title}** ✅`).then(() => {
                return int.reply({ content: `Müziğin adı DM'den gönderildi ✅`, ephemeral: true, components: [] });
            }).catch(error => {
                return int.reply({ content: `Size DM'den mesaj gönderilemiyor... tekrar dene ? ❌`, ephemeral: true, components: [] });
            });
        }
    }
};