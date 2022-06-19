module.exports = {
    app: {
        px: '!',
        token: 'OTg4MDAwNTcyNzY0NDgzNjA2.GaHGA4.CCbGNa7HJ2OZqjUsw-uVmhoeNkjgpMW7e5sZcM',
        playing: 'Code'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};