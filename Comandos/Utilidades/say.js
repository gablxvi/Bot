const Discord = require("discord.js")
const config = require('../../config.json')
module.exports = {
  name: "say", // Coloque o nome do comando
  description: "Faça eu falar", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [

    {
        name: "mensagem",
        description: "Falarei no chat.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(`${config.ownerID}`)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        
        let embed_fala = interaction.options.getString("embed");
        let normal_fala = interaction.options.getString("mensagem");
        
        if (!embed_fala && !normal_fala) {
            interaction.reply(`Escreva pelo menos em uma das opções.`)
        } else {
            if (!embed_fala) embed_fala = "⠀";
            if (!normal_fala) normal_fala = "⠀";

            let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(embed_fala);

            if (embed_fala === "⠀") {
                interaction.reply({ content: ` Sua mensagem foi enviada!`, ephemeral: true })
                interaction.channel.send({ content: `${normal_fala}` })
            } else if (normal_fala === "⠀") {
                interaction.reply({ content: ` Sua mensagem foi enviada!`, ephemeral: true })
                interaction.channel.send({ embeds: [embed] })
            } else {
                interaction.reply({ content: ` Sua mensagem foi enviada!`, ephemeral: true })
                interaction.channel.send({ content: `${normal_fala}`, embeds: [embed] })
            }
        }
    }


  }
}