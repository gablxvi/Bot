const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "doar",
    description: "Doe moedas para outro usuário.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Usuário para quem você deseja doar moedas.",
            required: true
        },
        {
            name: "quantia",
            type: Discord.ApplicationCommandOptionType.Integer,
            description: "Quantia de moedas que você deseja doar.",
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        let donor = interaction.user;
        let recipient = interaction.options.getUser("usuário");
        let amount = interaction.options.getInteger("quantia");

        if (amount <= 0) {
            return interaction.reply({ content: "Por favor, insira uma quantia válida para doar.", ephemeral: true });
        }

        let donorBalance = await db.get(`carteira_${donor.id}`);
        if (donorBalance === null || donorBalance < amount) {
            return interaction.reply({ content: "Você não tem moedas suficientes para doar.", ephemeral: true });
        }

        await db.sub(`carteira_${donor.id}`, amount);
        await db.add(`carteira_${recipient.id}`, amount);

        let embed = new Discord.EmbedBuilder()
            .setColor("Purple")
            .setTitle("🎁 Doação Realizada!")
            .setDescription(`${donor.username} doou \`${amount} moedas\` para ${recipient.username}.`)
            .setThumbnail(donor.displayAvatarURL({ dynamic: true }));

        interaction.reply({ embeds: [embed] });
    }
};
