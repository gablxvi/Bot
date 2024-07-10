const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "duelo",
    description: "Desafie outro usuário para um duelo e aposte moedas.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Usuário que você deseja desafiar para um duelo.",
            required: true
        },
        {
            name: "quantia",
            type: Discord.ApplicationCommandOptionType.Integer,
            description: "Quantia de moedas que você deseja apostar.",
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        let challenger = interaction.user;
        let opponent = interaction.options.getUser("usuário");
        let amount = interaction.options.getInteger("quantia");

        if (amount <= 0) {
            return interaction.reply({ content: "Por favor, insira uma quantia válida para apostar.", ephemeral: true });
        }

        let challengerBalance = await db.get(`carteira_${challenger.id}`);
        if (challengerBalance === null || challengerBalance < amount) {
            return interaction.reply({ content: "Você não tem moedas suficientes para apostar.", ephemeral: true });
        }

        let opponentBalance = await db.get(`carteira_${opponent.id}`);
        if (opponentBalance === null || opponentBalance < amount) {
            return interaction.reply({ content: `${opponent.username} não tem moedas suficientes para aceitar o duelo.`, ephemeral: true });
        }

        // Simulação do resultado do duelo
        let challengerWins = Math.random() < 0.5; // 50% de chance de vitória para o desafiante

        if (challengerWins) {
            await db.add(`carteira_${challenger.id}`, amount);
            await db.sub(`carteira_${opponent.id}`, amount);

            let embed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setTitle("🤺 Duelo Vencido!")
                .setDescription(`${challenger.username} ganhou o duelo contra ${opponent.username} e recebeu \`${amount} moedas\`.`)
                .setThumbnail(challenger.displayAvatarURL({ dynamic: true }));

            interaction.reply({ embeds: [embed] });
        } else {
            await db.sub(`carteira_${challenger.id}`, amount);
            await db.add(`carteira_${opponent.id}`, amount);

            let embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setTitle("🤺 Duelo Perdido!")
                .setDescription(`${challenger.username} perdeu o duelo para ${opponent.username} e pagou \`${amount} moedas\` para ${opponent.username}.`)
                .setThumbnail(challenger.displayAvatarURL({ dynamic: true }));

            interaction.reply({ embeds: [embed] });
        }
    }
};
