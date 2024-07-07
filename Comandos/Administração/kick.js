const Discord = require("discord.js")

module.exports = {
  name: "kick",
  description: "Expulsar um usuário.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "usuário",
        description: "Mencione um usuário para ser expulso.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "motivo",
        description: "Insira um motivo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) {
        interaction.reply(`Você não possui permissão para utilizar este comando.`);
    } else {
        let userr = interaction.options.getUser("usuário");
        let user = interaction.guild.members.cache.get(userr.id)
        let motivo = interaction.options.getString("motivo");
        if (!motivo) motivo = "Não definido.";

        let embed = new Discord.EmbedBuilder()
        .setColor("#f0ea06")
        .setDescription(` O usuário ${user} (\`${user.id}\`) foi expulso com sucesso!`);

        let erro = new Discord.EmbedBuilder()
        .setColor("#f0ea06")
        .setDescription(`Não foi possível expulsar o usuário ${user} (\`${user.id}\`) do servidor!`);

        user.kick({ reason: [motivo] }).then( () => {
            interaction.reply({ embeds: [embed] })
        }).catch(e => {
            interaction.reply({ embeds: [erro] })
        })
    }

  }
}
