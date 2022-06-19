player.on('error', (queue, error) => {
    console.log(`Sıradan kaynaklı hata ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Bağlantıdan kaynaklanan hata ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    queue.metadata.send(`${queue.connection.channel.name} kanalında, **${track.title}** oynamaya başladı 🎧`);
});

player.on('trackAdd', (queue, track) => {
    queue.metadata.send(`Parça **${track.title}** sıraya eklendi ✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('Ses kanalıyla bağlantım manuel olarak kesildi, sıra temizlendi... ❌');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('Ses kanalında kimse yok, ses kanalından çıkılıyor.. ❌');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('Tüm liste bitti ✅');
});