const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { isUserJailed } = require("../../Eventos/utils");

module.exports = {
    name: "transferir",
    description: "Transfira moedas para outro usuário.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Usuário para quem você deseja transferir moedas.",
            required: true
        },
        {
            name: "quantia",
            type: Discord.ApplicationCommandOptionType.Integer,
            description: "Quantia de moedas que deseja transferir.",
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        if (await isUserJailed(interaction.user.id)) {
            return interaction.reply({ content: "Você está preso e não pode usar este comando.", ephemeral: true });
        }

        let sender = interaction.user;
        let recipient = interaction.options.getUser("usuário");
        let amount = interaction.options.getInteger("quantia");

        if (amount <= 0) {
            return interaction.reply({ content: "Por favor, insira uma quantia válida para transferir.", ephemeral: true });
        }

        let senderBalance = await db.get(`carteira_${sender.id}`);
        if (senderBalance === null) senderBalance = 0;

        if (senderBalance < amount) {
            return interaction.reply({ content: "Você não tem moedas suficientes para transferir.", ephemeral: true });
        }

        await db.sub(`carteira_${sender.id}`, amount);
        await db.add(`carteira_${recipient.id}`, amount);

        let embed = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setTitle("💸 Transferência Concluída!")
            .setDescription(`Você transferiu \`${amount} moedas\` para ${recipient.username}.`)
            .setThumbnail(sender.displayAvatarURL({ dynamic: true }));

        interaction.reply({ embeds: [embed] });

        let embedRecipient = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("💸 Você recebeu uma transferência!")
            .setDescription(`${sender.username} transferiu \`${amount} moedas\` para você.`)
            .setThumbnail(recipient.displayAvatarURL({ dynamic: true }));

        recipient.send({ embeds: [embedRecipient] }).catch(() => {
            console.log(`Não foi possível enviar uma mensagem direta para ${recipient.username}`);
        });
    }
}
