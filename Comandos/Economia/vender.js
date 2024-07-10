const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "vender",
    description: "Venda um item do seu inventário.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "item",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Nome do item que você deseja vender.",
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

        let inventory = await db.get(`inventory_${user.id}`);
        if (!inventory || !inventory.includes(itemName)) {
            return interaction.reply({ content: "Você não possui este item em seu inventário.", ephemeral: true });
        }

        let itemPrice = items[itemName];
        let sellPrice = Math.floor(itemPrice * 0.5); // O preço de venda é 50% do preço de compra

        await db.add(`carteira_${user.id}`, sellPrice);
        inventory.splice(inventory.indexOf(itemName), 1); // Remove o item do inventário
        await db.set(`inventory_${user.id}`, inventory);

        let embed = new Discord.EmbedBuilder()
            .setColor("Orange")
            .setTitle("💸 Venda bem-sucedida")
            .setDescription(`Você vendeu uma \`${itemName}\` por \`${sellPrice} moedas\`.`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }));

        interaction.reply({ embeds: [embed] });
    }
};
