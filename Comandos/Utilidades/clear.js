const Discord = require("discord.js")

module.exports = {
    name: "clear", 
    description: "Limpe as mensagens do canal de texto", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'numero',
            description: 'Número de mensagens para serem apagadas.',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        }
    ],




    run: async (client, interaction) => {

        let numero = interaction.options.getNumber('numero')

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {

            if(!interaction.guild.members.me.permissions.has("ManageMessages"))
            return interaction.reply("Parece que estou sem permissões suficientes!");

            if (parseInt(numero) > 100 || parseInt(numero) <= 0) {

                let embed = new Discord.EmbedBuilder()
                    .setColor("#8f45ff")
                    .setDescription(`\`/clear [1 - 99]\``);

                interaction.reply({ embeds: [embed] })

            } else {

                interaction.channel.bulkDelete(parseInt(numero))

                const botcor = interaction.guild.members.cache.get(client.user.id)

                let embed = new Discord.EmbedBuilder()
                     .setColor("#8f45ff")
                    .setAuthor({ name: `Limpeza concluida com sucesso`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setImage("https://media.discordapp.net/attachments/1107853862431359047/1234227764907872367/standard_4.gif?ex=662ff7ad&is=662ea62d&hm=24b1e8f958847ecd1842cf2e1a569d20e4e6e1787e6f2adc7baf6f8f59546ed3&=&width=421&height=53")
                    .setDescription(`O chat ${interaction.channel} teve ${numero} mensagens apagadas por ${interaction.user}.`);

                interaction.reply({ embeds: [embed] })
                
                setTimeout(() => {
                    interaction.deleteReply()
                }, 5000)

              

            }

        }

    }
}
