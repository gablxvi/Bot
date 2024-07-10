const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "estatisticas",
    description: "Mostra estatísticas gerais do servidor.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {
        let allData = await db.all();
        let totalUsers = allData.filter(entry => entry.id.startsWith("carteira_")).length;
        
        let totalCoins = 0;
        allData.forEach(entry => {
            if (entry.id.startsWith("carteira_")) {
                totalCoins += entry.value;
            }
        });

        let embed = new Discord.EmbedBuilder()
            .setColor("#3498db")
            .setTitle("📊 Estatísticas Globais")
            .addFields(
                { name: "Total de Usuários", value: `\`${totalUsers}\``, inline: true },
                { name: "Total de Moedas Circulando", value: `\`${totalCoins} moedas\``, inline: true }
            );

        interaction.reply({ embeds: [embed] });
    }
};
