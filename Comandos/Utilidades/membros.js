const { ApplicationCommandType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "membros",
    description: "Estou cuidando de",
    type: ApplicationCommandType.ChatInput,

    run: async(client, interaction) => {

        let embed = new EmbedBuilder()
        .setTitle('Estou cuidando atualmente de:')
        .setDescription(`${client.guilds.cache.size.toLocaleString('en-US')} Servidores e ${client.users.cache.size.toLocaleString('en-US')} Usuarios`)
        .setColor("#8f45ff")
        interaction.reply({
            embeds: [embed]
            })
    },
}