const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

const discord = require("discord.js")


module.exports = {
  name: 'removepd',
  description: 'Escolher quem tirar de lady',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'lady',
      type: ApplicationCommandOptionType.User,
      description: 'Mencione o membro que retirara de lady.',
      required: true,
    },
  ],
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(discord.PermissionFlagsBits.Administrator)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
     const user = interaction.options.getUser('lady')
     const member = interaction.guild.members.cache.get(user.id)
     member.roles.remove('ID DO CARGO')

     let embed = new EmbedBuilder()
     .setTitle(`${interaction.guild.name} - Gerenciamento de Ladys`)
     .setDescription('Um dono acaba de retirar a posição de **Lady** a um membro')
     .setColor('#e91e63')
     .addFields(
     {
         name: `**Dono:** ${interaction.user.tag}`,
         value: `**Lady:** ${user}`,
         inline: true
     }
     )
     .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
         .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setTimestamp(new Date())
            interaction.reply({ embeds: [embed] }).then((msg) => { setTimeout(() => {
              interaction.deleteReply()
          }, 3000)

        })
      }
  }}