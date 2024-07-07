const Discord = require('discord.js')

module.exports = {
  name: 'slowmode',
  description: 'Adiconar o modo lento nas mensagens em um canal específico',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'duração',
      description: 'Escolha uma duração para o modo (Segundos)',
      type: Discord.ApplicationCommandOptionType.Integer,
      required: true,
    },
    {
      name: 'canal',
      description: 'Escolha o canal para ativar o modo',
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
    }
  ],
  async run(client, interaction, args) {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
      interaction.reply({
          embeds: [new Discord.EmbedBuilder()
          .setTitle("Erro!")
          .setDescription(`${interaction.member} Você não possui permissão para utilizar este comando.`)
          .setColor("#FFFFFF")
          .setTimestamp()
          ], ephemeral: true
      })
  } else {

    const duration = interaction.options.getInteger('duração');
    const channel = interaction.options.getChannel('canal') || interaction.channel;

    const embed = new Discord.EmbedBuilder()
      .setTitle('Sucesso!!')
      .setDescription(`<a:1111104374039662704:1124475416707616828> ‣ ${interaction.member} O canal ${channel} agora tem \`${duration} segundos\` de Modo Lento.`)
      .setTimestamp()
      .setColor("#FFFFFF")

    channel.setRateLimitPerUser(duration).catch(err => {
      return;
    });

    await interaction.reply({ embeds: [embed] });

  }
}
}