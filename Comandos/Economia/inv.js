const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "inventario",
    description: "Veja todos os itens que você comprou.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Veja o inventário de um usuário.",
            required: false
        }
    ],

    run: async (client, interaction, args) => {
        let user = interaction.options.getUser("usuário") || interaction.user;
        let inventory = await db.get(`inventory_${user.id}`);

        if (!inventory || inventory.length === 0) {
            return interaction.reply({ content: `${user.username} não possui itens no inventário.`, ephemeral: true });
        }

        let embed = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setTitle(`📦 Inventário de ${user.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setDescription(inventory.join(", "));

        interaction.reply({ embeds: [embed] });
    }
};
