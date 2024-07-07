const Discord = require("discord.js");

module.exports = {
    name: 'lista_banidos_tag',
    description: 'Lista de Membros Banidos do Servidor.',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async(client, interaction) => {
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers))
         return interaction.reply({ content: `**❌ - Você não tem permissão para utilizar este comando.**`, ephemeral: true})

         let fetchBans = interaction.guild.bans.fetch();
         let banMembers = (await fetchBans)
          .map((member) => member.user)
          .join("\n")
           
         if(!banMembers) 
         return interaction.reply({ embeds: [new Discord.EmbedBuilder()
          .setColor("Red")
          .setDescription(`**Nenhum membro banido encontrado...**`)
        ], ephemeral: true })

         let embedBanidos = new Discord.EmbedBuilder()
          .setColor("Green")
          .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
          .setTimestamp()
          .setThumbnail(interaction.guild.iconURL())
          .setDescription(`${banMembers}`)
  
         interaction.reply({ embeds: [embedBanidos], ephemeral: true })
    }
}