const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: `Shows your, or another user's, profile avatar`,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuário',
            type: ApplicationCommandOptionType.User,
            description: 'The user that you want to steal... I mean, view, their avatar',
            require: false,
        },
    ],
    run: async (client, interaction) => {

        let userMention = interaction.options.getUser('usuário');
        if (!userMention) {
            userMention = interaction.user;
        }
        let avatar = userMention.avatarURL({ format: 'png', dynamic: true, size: 2048 });
        if (avatar) {
            const embed = new EmbedBuilder()
                .setTitle(`${userMention.username}`)
                .setImage(avatar)
                .setColor('#8f45ff')

            const button = new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                        .setLabel('Abrir avatar no navegador')
                        .setURL(avatar)
                        .setStyle(5)
                ])

            interaction.reply({ 
                embeds: [embed],
                components: [button]
            })
        } else {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#8f45ff')
                    .setDescription(':error: **|** Nenhum avatar encontrado.')
                ], ephemeral: true
            })
        }
    },
}