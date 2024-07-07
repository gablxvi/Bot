const Discord = require("discord.js");

module.exports = {
    name: "clonar_canal",
    description: "Clone um Canal!",
    options: [
        {
            name: `canal`,
            type: Discord.ApplicationCommandOptionType.Channel,
            description: 'Canal que será Clonado',
            required: true,
            channelTypes: [0, 2]
        }
    ],
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: "<:n_:1140745577215299735> | Você não tem permissão para usar este comando!",
                ephemeral: true,
            });

        } else {

            const channel = interaction.options.getChannel('canal');

            try {

                // Clona o canal selecionado embaixo dele
                const newChannel = await channel.clone();
                await newChannel.setPosition(channel.position + 1);
                await newChannel.setName(`${channel.name}-2`)
                await interaction.reply({
                    content: `<a:red_dancando:1141172849185394789> | Canal clonado com sucesso. Novo canal: ${newChannel}`,
                    ephemeral: false,
                });

            } catch (error) {

                // Bot Sem permissão suficiente ou algum outro erro, adiciona "console.log(error)" se quiser
                return interaction.reply({
                    content: `<:n_:1140745577215299735> | Ocorreu um erro desconhecido ao clonar o canal ${channel}.`,
                    ephemeral: true
                });

            };

        };
    }
}
