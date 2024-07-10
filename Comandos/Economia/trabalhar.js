const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const ms = require("ms");

const cooldowns = {};

module.exports = {
    name: "trabalhar",
    description: "Ganhe moedas trabalhando.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {
        let user = interaction.user;

        if (!cooldowns[user.id]) cooldowns[user.id] = { lastCmd: null };
        let ultimoCmd = cooldowns[user.id].lastCmd;
        let timeout = ms("1 hour");

        if (ultimoCmd !== null && timeout - (Date.now() - ultimoCmd) > 0) {
            let time = ms(timeout - (Date.now() - ultimoCmd));
            return interaction.reply({ content: `Você já trabalhou recentemente. Tente novamente em \`${time}\`.`, ephemeral: true });
        } else {
            cooldowns[user.id].lastCmd = Date.now();
        }

        let quantia = Math.floor(Math.random() * 1000) + 1;

        await db.add(`carteira_${user.id}`, quantia);

        let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("💼 Trabalho realizado!")
            .setDescription(`Você trabalhou e ganhou \`${quantia} moedas\`.\nUse \`/carteira\` para ver seu saldo.`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }));

        interaction.reply({ embeds: [embed] });
    }
};
