const Discord = require("discord.js");

module.exports = {
    name: "add_cargo",
    description: "Adicionar um Cargo em um Usuário!",
    options: [
        {
            name: `cargo`,
            type: Discord.ApplicationCommandOptionType.Role,
            description: 'Cargo que será Adicionado',
            required: true
        },
        {
            name: `usuário`,
            type: Discord.ApplicationCommandOptionType.User,
            description: 'Usuário que irá receber o Cargo',
            required: true
        }
    ],
    type: Discord.ApplicationCommand.ChatInput,

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: "⚠ | Você não tem permissão para usar este comando!",
                ephemeral: true,
            });

        } else {

            const role = interaction.options.getRole('cargo');
            const user = interaction.options.getUser('usuário');

            const member = interaction.guild.members.cache.get(`${user.id}`);

            try {

                if (!member.roles.cache.get(`${role.id}`)) {

                    // Adiciona o cargo no usuario
                    await member.roles.add(role);
                    return interaction.reply({
                        content: `<a:K101:1140743063766052966> | Cargo ${role} Adicionado ao Usuário **${user.tag}**.`,
                        ephemeral: true
                    });

                } else {

                    // O Usuário já tem o cargo escolhido
                    return interaction.reply({
                        content: `<:n_:1140745577215299735> | O Usuário **${user.tag}** já possui o cargo ${role}.`,
                        ephemeral: true
                    });

                };


            } catch (error) {

                // Bot Sem permissão suficiente ou algum outro erro, adiciona "console.log(error)" se quiser
                return interaction.reply({
                    content: `<a:K100:1140743156376285327> | Não tenho permissões suficientes para setar o cargo ${role}.`,
                    ephemeral: true
                });

            };

            
        };
    }
}