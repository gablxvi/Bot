const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { isUserJailed } = require("../../Eventos/utils");

module.exports = {
    name: "carteira",
    description: "Veja a quantidade de moedas em sua carteira.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Veja a carteira de um usuário.",
            required: false
        }
    ],

    run: async (client, interaction, args) => {
        if (await isUserJailed(interaction.user.id)) {
            return interaction.reply({ content: "Você está preso e não pode usar este comando.", ephemeral: true });
        }

        let user = interaction.options.getUser("usuário");
        if (!user) user = interaction.user;

        let carteira = await db.get(`carteira_${user.id}`);
        if (carteira === null) carteira = 0;

        let embed = new Discord.EmbedBuilder()
            .setColor("Yellow")
            .setTitle("💸 Carteira")
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setDescription(user.id === interaction.user.id ?
                `Você possui \`${carteira} moedas\` em sua carteira.` :
                `O usuário ${user} (${user.id}) possui \`${carteira} moedas\` em sua carteira.`);

        interaction.reply({ embeds: [embed] });
    }
}
