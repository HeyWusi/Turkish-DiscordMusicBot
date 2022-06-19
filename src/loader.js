const { readdirSync } = require('fs');
const { Collection } = require('discord.js');

client.commands = new Collection();

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

console.log(`Eventler yükleniyor...`);

for (const file of events) {
    const event = require(`../events/${file}`);
    console.log(`-> Event yüklendi ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`../events/${file}`)];
};

console.log(`Komutlar yükleniyor...`);

readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`../commands/${dirs}/${file}`);
        console.log(`-> Komut yüklendi ${command.name.toLowerCase()}`);
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
    };
});