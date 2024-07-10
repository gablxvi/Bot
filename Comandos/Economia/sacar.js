const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { isUserJailed } = require("../../Eventos/utils");

module.exports = {
    name: "sacar",
    description: "Saque moedas do banco.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "quantia",
            type: Discord.ApplicationCommandOptionType.Integer,
            description: "Quantidade de moedas para sacar.",
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        if (await isUserJailed(interaction.user.id)) {
            return interaction.reply({ content: "Você está preso e não pode usar este comando.", ephemeral: true });
        }

        let amount = interaction.options.getInteger("quantia");
        let bankBalance = await db.get(`banco_${interaction.user.id}`);
        if (bankBalance === null) bankBalance = 0;

        if (amount > bankBalance) {
            return interaction.reply({ content: "Você não tem moedas suficientes no banco.", ephemeral: true });
        }

        await db.sub(`banco_${interaction.user.id}`, amount);
        await db.add(`carteira_${interaction.user.id}`, amount);

        let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("🏦 Saque bem-sucedido!")
            .setDescription(`Você sacou \`${amount} moedas\` do banco.`);

        interaction.reply({ embeds: [embed] });
    }
}
