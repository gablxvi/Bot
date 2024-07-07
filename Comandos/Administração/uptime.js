const Discord = require('discord.js')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ApplicationCommandType, SelectMenuBuilder } = require("discord.js")

module.exports = {

    name: "uptime",
    description: "Permite ver o tempo de funcionamento do Bot",
    permission: "None",
    dm: false,

    async run(client, message, args) {

        let days = Math.floor((client.uptime / (1000 * 60 * 60 * 24)) % 60).toString();
        let hours = Math.floor((client.uptime / (1000 * 60 * 60)) % 60).toString();
        let minuts = Math.floor((client.uptime / (1000 * 60)) % 60).toString();
        let seconds = Math.floor((client.uptime / 1000) % 60).toString();

        let Embed = new Discord.EmbedBuilder()
        .setColor('2b2d31')
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .setDescription(`\`\`\`👋 Olá, tudo bem? Estou Online há:\`\`\`\n📅 | Dias: \`${days}\`\n📅 | Horas: \`${hours}\`\n📅 | Minutos: \`${minuts}\`\n📅 | Segundos: \`${seconds}\``)
        .setTimestamp()
        .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL({ ephemeral: true})})

        await message.reply({embeds: [Embed], ephemeral: true})
    }
};