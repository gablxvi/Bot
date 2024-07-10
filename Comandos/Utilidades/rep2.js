const Discord = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: 'reps',
    description: 'Mostra todas as suas reputações.',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {
        const user = interaction.user;

        let reputacoes = await db.get(`reputacao_${user.id}`);
        if (reputacoes === null || reputacoes === undefined) {
            reputacoes = 0;
        }

        let embed = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`🌟 Reputações de ${user.username}`)
            .setDescription(`Você possui um total de ${reputacoes} reputações.`);

        interaction.reply({ embeds: [embed] });
    }
};
