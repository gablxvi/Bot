const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "apostar",
    description: "Jogue em jogos de azar para ganhar moedas.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "quantia",
            type: Discord.ApplicationCommandOptionType.Integer,
            description: "Quantidade de moedas para apostar.",
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        let user = interaction.user;
        let amount = interaction.options.getInteger("quantia");

        let userBalance = await db.get(`carteira_${user.id}`);
        if (userBalance === null || userBalance < amount) {
            return interaction.reply({ content: "Você não tem moedas suficientes para apostar.", ephemeral: true });
        }

        // Lógica de jogo de azar fictícia: exemplo de 50% de chance de ganhar
        let isWin = Math.random() < 0.4;
        let winnings = isWin ? amount * 2 : 0;

        if (winnings > 0) {
            await db.add(`carteira_${user.id}`, winnings);
        } else {
            await db.sub(`carteira_${user.id}`, amount);
        }

        let resultMessage = isWin ? `Você ganhou \`${winnings} moedas\`!` : "Você perdeu a aposta.";

        let embed = new Discord.EmbedBuilder()
            .setColor("#e74c3c")
            .setTitle("🎲 Jogo de Azar")
            .setDescription(`Você apostou \`${amount} moedas\`. ${resultMessage}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }));

        interaction.reply({ embeds: [embed] });
    }
};
