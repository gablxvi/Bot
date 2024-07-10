const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "comprar",
    description: "Compre um item da loja.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "item",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Nome do item que você deseja comprar.",
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        let user = interaction.user;
        let itemName = interaction.options.getString("item");
        const items = {
            "Espada": 500,
            "Escudo": 300,
            "Poção de Vida": 100,
        };

        if (!items[itemName]) {
            return interaction.reply({ content: "Este item não existe na loja.", ephemeral: true });
        }

        let userBalance = await db.get(`carteira_${user.id}`);
        if (userBalance === null) userBalance = 0;

        let itemPrice = items[itemName];
        if (userBalance < itemPrice) {
            return interaction.reply({ content: "Você não tem moedas suficientes para comprar este item.", ephemeral: true });
        }

        await db.sub(`carteira_${user.id}`, itemPrice);
        await db.push(`inventory_${user.id}`, itemName);

        let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("🛒 Compra bem-sucedida")
            .setDescription(`Você comprou uma \`${itemName}\` por \`${itemPrice} moedas\`.`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }));

        interaction.reply({ embeds: [embed] });
    }
};
