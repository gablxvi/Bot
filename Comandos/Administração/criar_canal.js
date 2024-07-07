const Discord = require("discord.js");

module.exports = {
    name: "criarcanal",
    description: "Crie um Canal!",
    options: [
        {
            name: `nome`,
            type: Discord.ApplicationCommandOptionType.String,
            description: 'Nome do Canal',
            required: true
        },
        {
            name: `categoria`,
            type: Discord.ApplicationCommandOptionType.Channel,
            description: 'Escolha a Categoria',
            required: true,
            channelTypes: [4]
        },
        {
            name: `tipo`,
            type: Discord.ApplicationCommandOptionType.Integer,
            description: 'Tipo do Canal',
            required: true,
            choices: [
                { name: 'Canal de Texto', value: 1 },
                { name: 'Canal de Voz', value: 2 }
            ]
        }
    ],
    type: Discord.ApplicationCommand.ChatInput,

    run: async (client, interaction) => {

        const nameC = interaction.options.getString('nome');
        const cateC = interaction.options.getChannel('categoria');
        const typeC = interaction.options.getInteger('tipo');

        switch (typeC) {

            // CANAL DE TEXTO
            case 1:

                const channelText = await interaction.guild.channels.create({
                    name: nameC,
                    type: 0,
                    parent: cateC
                });

                await interaction.reply({
                    content: `<a:K101:1140743063766052966> | Canal ${channelText} criado na categoria   ${cateC} .`,
                    ephemeral: false
                });
                break;

            // CANAL DE VOZ
            case 2:

                const channelVoice = await interaction.guild.channels.create({
                    name: nameC,
                    type: 2,
                    parent: cateC
                });

                await interaction.reply({
                    content: `<a:K101:1140743063766052966> | Canal ${channelVoice} criado na categoria   ${cateC} .`,
                    ephemeral: false
                });
                break;

        };


    }
}