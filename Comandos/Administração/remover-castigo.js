const Discord = require('discord.js')

module.exports = {
    name: 'removercastigo',
    description: 'Retire algum usuario do castigo',
    options: [
        {
            name: 'usuário',
            description: 'Selecione um usuario.',
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'motivo',
            type: Discord.ApplicationCommandOptionType.String,
            description: 'Coloque o motivo para você estar retirando o castigo do usuario.',
            required: false,
        },
    ],

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: `<:xx:1035315658814132345> | Você não possui permissão para utilizar esse comando.`,
                ephemeral: true,
            })

        } else {

            const member = interaction.options.getMember('usuário');
            let usuario = interaction.options.getUser("usuário")
            let motivo = interaction.options.getString("motivo") || `Nenhum`

            let membro = interaction.guild.members.cache.get(usuario.id);


            if (!member.isCommunicationDisabled()) {
                return interaction
                    .reply({
                        content: 'Ops, este usuário não está de castigo.',
                        ephemeral: true,
                    })
                    .catch((e) => { });
            }

            let ryan = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`
                **O usuario ${usuario} ( \`${usuario.id}\` ) teve o seu castigo removido pelo motivo \`${motivo}\`.**`)
                .setFooter({ text: `Comando requisitado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ format: "png" }) });


            await member.disableCommunicationUntil(null, `${motivo}`);
            interaction.reply({ embeds: [ryan] })
        };
    }
}


