const Discord = require("discord.js")

module.exports = {
    name: "renomear_canal",
    description: "Renomear o canal em que usar o comando!",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "nome",
            description: "Qual sera o novo nome do canal.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    run: async (Client, interaction, args) => {
        
        let renamechannel = interaction.options.getString("nome");

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {

            let embed = new Discord.EmbedBuilder()
                .setTitle("Canal Renomeado!")
                .setColor('2f3136')
                .setDescription(`<:n_:1140745577215299735> Esse canal foi renomeado para \`\`\`${renamechannel}\`\`\``)

              const nomedocanal = interaction.options.getString("nome");

                interaction.reply({ ephemeral: true, embeds: [embed]}).then(() => {
                        interaction.channel.setName(`${nomedocanal}`);
                })
                }
            }
    }