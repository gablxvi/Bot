const Discord = require('discord.js')
const { obterTodosEmojis, obterEmoji, verificarEmoji } = require("../../handler/EmojiFunctions");

module.exports = {
  name: 'qr',
  description: 'Transformo um link em QR code.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'link',
      description: 'Coloque o link que você quer que se transforma em um QR Code.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true
    }
  ],

  run: async (client, interaction) => {

const link = interaction.options.getString('link')

    let embed = new Discord.EmbedBuilder()
     .setTitle(`${obterEmoji(28)} Aqui está seu QR Code:`)
     .setImage(`https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=${link}`)
     .setColor(`2b2d31`)
     .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true})})
     .setTimestamp()

    interaction.reply({ embeds: [embed] })
  }
}

