const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "loja",
    description: "Veja os itens disponíveis na loja.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {
        const items = [
            { name: "Espada", price: 500 },
            { name: "Escudo", price: 300 },
            { name: "Poção de Vida", price: 100 },
        ];

        let embed = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setTitle("🛒 Loja")
            .setDescription("Aqui estão os itens disponíveis para compra:");

        items.forEach(item => {
            embed.addFields({ name: item.name, value: `Preço: \`${item.price} moedas\``, inline: true });
        });

        interaction.reply({ embeds: [embed] });
    }
};
