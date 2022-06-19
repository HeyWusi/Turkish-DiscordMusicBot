module.exports = async (client) => {
    console.log(`Connected to discord. (User *${client.user.username}*)`);

    client.user.setActivity(client.config.app.playing);
};