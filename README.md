# Turkish-DiscordMusic-Bot

Basit kuruluma sahip discord müzik botu 🎧

### ⚡ Yapılandırma

Ana klasörde bulunan config dosyasını açın `config.js`.

```js
module.exports = {
    app: {
        px: 'XXX',
        token: 'XXX',
        playing: 'by Wusi 💜'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'XXX',
            commands: []
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {}
    }
};
```

Basit kurulum

- `app/px`, istediğin prefix'i seçebilirsin
- `app/token`, botun aktif olabilmesi ve çalışabilmesi için botun tokenine ihtiyacın olucak [Discord Developers](https://discordapp.com/developers/applications) 
- `app/playing`, botun etkinlik durumu

### 📑 Kurulum

Bu projeyi kullanabilmeniz için gereken 2 araç.

[FFmpeg](https://www.ffmpeg.org) sesi işlemek için

[Node JS](https://nodejs.org/en/) (v16)

[Wusi](https://github.com/HeyWusi) tarafından gerçekleştirildi.