const Discord = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    name: "connect",
    description: "Conectar Em Um Canal de Voz.",
    options: [
        {
            name: "canal",
            description: "Coloque O Canal De Voz.",
            type: Discord.ApplicationCommandOptionType.Channel,
            channelTypes: [
                Discord.ChannelType.GuildVoice,
            ],
            required: true
        }
    ],

    run: async (client, interaction) => {
        let canal = interaction.options.getChannel('canal');

        joinVoiceChannel({
            channelId: canal.id,
            guildId: canal.guild.id,
            adapterCreator: canal.guild.voiceAdapterCreator
        })

        const embed = new Discord.EmbedBuilder()
        .setColor('#000000')
        .setDescription(`💖 **${interaction.user.username}, Conectei No Canal De Voz: ${canal}**`)
        interaction.reply({ embeds: [embed] })
    }
}