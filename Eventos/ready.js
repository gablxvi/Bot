const { ActivityType } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {

        const serverCount = client.guilds.cache.size;
        const userCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

        console.log(`💚 Estou online em ${client.user.username}`);
        console.log(`📦 Estou em ${serverCount} servidores com um total de ${userCount} usuários.`);
        console.log(`🔪 Meu criado: Gabriel Alves`);

        const statuses = [
            { name: 'Tornando seu servidor mais divertido!', type: ActivityType.Playing },
            { name: 'Conectando pessoas no Discord!', type: ActivityType.Streaming, url: 'https://www.twitch.tv/toddylxvi' },
            { name: `Já estou em ${serverCount} servidores`, type: ActivityType.Watching },
            { name: `Ajudando ${userCount} usuários`, type: ActivityType.Watching },
            { name: 'Digite /help para comandos', type: ActivityType.Streaming, url: 'https://www.twitch.tv/toddylxvi' },
        ];

        let i = 0;
        setInterval(() => {
            client.user.setActivity(statuses[i]);
            i = (i + 1) % statuses.length;
        }, 60000); 
    },
};
