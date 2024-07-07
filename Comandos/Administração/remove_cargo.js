const Discord = require("discord.js");

module.exports = {
    name: "remove_cargo",
    description: "Remover um Cargo de um Usuário!",
    options: [
        {
            name: `cargo`,
            type: Discord.ApplicationCommandOptionType.Role,
            description: 'Cargo que será Removido',
            required: true
        },
        {
            name: `usuário`,
            type: Discord.ApplicationCommandOptionType.User,
            description: 'Usuário que terá o cargo Removido',
            required: true
        }
    ],
    type: Discord.ApplicationCommand.ChatInput,

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: "<:n_:1140745577215299735> | Você não tem permissão para usar este comando!",
                ephemeral: true,
            });

        } else {

            const role = interaction.options.getRole('cargo');
            const user = interaction.options.getUser('usuário');

            const member = interaction.guild.members.cache.get(`${user.id}`);

            try {

                if (member.roles.cache.get(`${role.id}`)) {

                    // Remove o cargo do usuario
                    await member.roles.remove(role);
                    return interaction.reply({
                        content: `<a:K101:1140743063766052966> | Cargo ${role} Removido do Usuário **${user.tag}**.`,
                        ephemeral: true
                    });

                } else {

                    // O Usuário não tem o cargo selecionado!
                    return interaction.reply({
                        content: `<:n_:1140745577215299735> | O Usuário **${user.tag}** não tem o cargo ${role}.`,
                        ephemeral: true
                    });

                };

            } catch (error) {

                // Bot Sem permissão suficiente ou algum outro erro, adiciona "console.log(error)" se quiser
                return interaction.reply({
                    content: `<:n_:1140745577215299735> | Não tenho permissões suficientes para remover o cargo ${role}.`,
                    ephemeral: true
                });

            };


        };
    }
}