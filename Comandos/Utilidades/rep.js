const Discord = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: 'rep',
    description: 'Dê reputação a um usuário.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuário',
            type: Discord.ApplicationCommandOptionType.User,
            description: 'Usuário a quem você deseja dar reputação.',
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        const user = interaction.options.getUser('usuário');

        if (user.id === interaction.user.id) {
            return interaction.reply({ content: 'Você não pode dar reputação a si mesmo!', ephemeral: true });
        }

        // Verificar se o usuário já deu reputação hoje
        const lastReputation = await db.get(`lastReputation_${interaction.user.id}`);
        if (lastReputation && Date.now() - lastReputation < 24 * 60 * 60 * 1000) {
            const timeLeft = new Date(lastReputation + 24 * 60 * 60 * 1000 - Date.now());
            const hours = timeLeft.getUTCHours();
            const minutes = timeLeft.getUTCMinutes();
            const seconds = timeLeft.getUTCSeconds();
            return interaction.reply({
                content: `Você só pode dar reputação novamente em ${hours}h ${minutes}m ${seconds}s.`,
                ephemeral: true
            });
        }

        // Adicionar reputação ao usuário
        await db.add(`reputacao_${user.id}`, 1);
        await db.set(`lastReputation_${interaction.user.id}`, Date.now());

        interaction.reply({ content: `Você deu uma reputação para ${user.username}!`, ephemeral: true });
    }
};
