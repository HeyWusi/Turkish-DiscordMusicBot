module.exports = {
    name: 'filter',
    aliases: [],
    utilisation: '{prefix}filter [filter name]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Şu anda müzik oynatılmıyor ${message.author}... tekrar dene ? ❌`);

        const actualFilter = queue.getFiltersEnabled()[0];

        if (!args[0]) return message.channel.send(`Lütfen etkinleştirmek veya devre dışı bırakmak için geçerli bir filtre belirtin ${message.author}... tekrar dene ? ❌\n${actualFilter ? `Filter currently active ${actualFilter} (${client.config.app.px}filter ${actualFilter} to disable it).\n` : ''}`);

        const filters = [];

        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filter) return message.channel.send(`Filtre yok ${message.author}... tekrar dene ? ❌\n${actualFilter ? `Filter currently active ${actualFilter}.\n` : ''}List of available filters ${filters.map(x => `**${x}**`).join(', ')}.`);

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        message.channel.send(`filtre ${filter} şu an **${queue.getFiltersEnabled().includes(filter) ? 'etkin' : 'devredışı'}** ✅\n*Hatırlatma, müzik ne kadar uzun olursa, o kadar uzun sürer.*`);
    },
};