const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const ms = require("ms");

const cooldowns = {};

module.exports = {
    name: "explorar",
    description: "Explore para encontrar tesouros e ganhar moedas.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {
        let user = interaction.user;

        if (!cooldowns[user.id]) cooldowns[user.id] = { lastCmd: null };
        let ultimoCmd = cooldowns[user.id].lastCmd;
        let timeout = ms("1 day"); // Cooldown de 1 dia para exploração

        if (ultimoCmd !== null && timeout - (Date.now() - ultimoCmd) > 0) {
            let time = ms(timeout - (Date.now() - ultimoCmd));
            return interaction.reply({ content: `Você já explorou recentemente. Tente novamente em \`${time}\`.`, ephemeral: true });
        } else {
            cooldowns[user.id].lastCmd = Date.now();
        }

        let quantia = Math.floor(Math.random() * 500) + 1;

        await db.add(`carteira_${user.id}`, quantia);

        let embed = new Discord.EmbedBuilder()
            .setColor("Gold")
            .setTitle("🌲 Exploração Realizada!")
            .setDescription(`Você explorou e encontrou \`${quantia} moedas\`.\nUse \`/carteira\` para ver seu saldo.`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }));

        interaction.reply({ embeds: [embed] });
    }
};
