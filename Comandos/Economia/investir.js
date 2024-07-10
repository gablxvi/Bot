const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "investir",
    description: "Investir suas moedas para obter retorno.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "quantia",
            type: Discord.ApplicationCommandOptionType.Integer,
            description: "Quantidade de moedas para investir.",
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        let user = interaction.user;
        let amount = interaction.options.getInteger("quantia");

        let userBalance = await db.get(`carteira_${user.id}`);
        if (userBalance === null || userBalance < amount) {
            return interaction.reply({ content: "Você não tem moedas suficientes para investir.", ephemeral: true });
        }

        // Lógica de investimento fictícia: apenas adiciona 10% do investimento como retorno
        let returnAmount = Math.floor(amount * 0.9);

        await db.sub(`carteira_${user.id}`, amount);
        await db.add(`carteira_${user.id}`, returnAmount);

        let embed = new Discord.EmbedBuilder()
            .setColor("#27ae60")
            .setTitle("📈 Investimento Concluído!")
            .setDescription(`Você investiu \`${amount} moedas\` e obteve um retorno de \`${returnAmount} moedas\`.`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }));

        interaction.reply({ embeds: [embed] });
    }
};
