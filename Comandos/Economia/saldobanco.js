const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { isUserJailed } = require("../../Eventos/utils");

module.exports = {
    name: "saldo-banco",
    description: "Veja a quantidade de moedas no banco.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Veja o saldo do banco de um usuário.",
            required: false
        }
    ],

    run: async (client, interaction, args) => {
        if (await isUserJailed(interaction.user.id)) {
            return interaction.reply({ content: "Você está preso e não pode usar este comando.", ephemeral: true });
        }

        let user = interaction.options.getUser("usuário");
        if (!user) user = interaction.user;

        let bankBalance = await db.get(`banco_${user.id}`);
        if (bankBalance === null) bankBalance = 0;

        let embed = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setTitle("🏦 Saldo do Banco")
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setDescription(user.id === interaction.user.id ?
                `Você possui \`${bankBalance} moedas\` no banco.` :
                `O usuário ${user} (${user.id}) possui \`${bankBalance} moedas\` no banco.`);

        interaction.reply({ embeds: [embed] });
    }
};
