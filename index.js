const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client({ intents: ["Guilds", "GuildMembers", "MessageContent", "GuildMessages"] });
const config = require("./config.json");

module.exports = client;

client.on('interactionCreate', (interaction) => {
    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.reply(`Error`);

        interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction);
    }
});

const eventFiles = fs.readdirSync('./Eventos').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./Eventos/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

client.slashCommands = new Discord.Collection();


require('./handler')(client);

client.login(config.token);
