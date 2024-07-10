const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { isUserJailed } = require("../../Eventos/utils");

module.exports = {
    name: "depositar",
    description: "Deposite moedas no banco.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "quantia",
            type: Discord.ApplicationCommandOptionType.Integer,
            description: "Quantidade de moedas para depositar.",
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        if (await isUserJailed(interaction.user.id)) {
            return interaction.reply({ content: "Você está preso e não pode usar este comando.", ephemeral: true });
        }

        let amount = interaction.options.getInteger("quantia");
        let walletBalance = await db.get(`carteira_${interaction.user.id}`);
        if (walletBalance === null) walletBalance = 0;

        if (amount > walletBalance) {
            return interaction.reply({ content: "Você não tem moedas suficientes na carteira.", ephemeral: true });
        }

        await db.sub(`carteira_${interaction.user.id}`, amount);
        await db.add(`banco_${interaction.user.id}`, amount);

        let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("🏦 Depósito bem-sucedido!")
            .setDescription(`Você depositou \`${amount} moedas\` no banco.`);

        interaction.reply({ embeds: [embed] });
    }
}
