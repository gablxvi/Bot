const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
    name: "pagar-fianca",
    description: "Pague a fiança de um usuário preso.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Usuário para quem você deseja pagar a fiança.",
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        let payer = interaction.user;
        let jailedUser = interaction.options.getUser("usuário");

        let bailAmount = await db.get(`bail_${jailedUser.id}`);
        if (bailAmount === null) {
            return interaction.reply({ content: "O usuário não está preso ou não tem fiança definida.", ephemeral: true });
        }

        let payerBalance = await db.get(`carteira_${payer.id}`);
        if (payerBalance === null) payerBalance = 0;

        if (payerBalance < bailAmount) {
            return interaction.reply({ content: "Você não tem moedas suficientes para pagar a fiança.", ephemeral: true });
        }

        await db.sub(`carteira_${payer.id}`, bailAmount);
        await db.delete(`jailed_${jailedUser.id}`);
        await db.delete(`bail_${jailedUser.id}`);

        let embed = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setTitle("💸 Fiança Paga!")
            .setDescription(`Você pagou \`${bailAmount} moedas\` para libertar ${jailedUser.username}.`)
            .setThumbnail(payer.displayAvatarURL({ dynamic: true }));

        interaction.reply({ embeds: [embed] });

        let embedJailedUser = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("💸 Você foi libertado!")
            .setDescription(`${payer.username} pagou \`${bailAmount} moedas\` para libertar você.`)
            .setThumbnail(jailedUser.displayAvatarURL({ dynamic: true }));

        jailedUser.send({ embeds: [embedJailedUser] }).catch(() => {
            console.log(`Não foi possível enviar uma mensagem direta para ${jailedUser.username}`);
        });
    }
}
