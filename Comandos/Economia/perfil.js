const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "perfil",
    description: "Veja o perfil de economia de um usuário.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Usuário cujo perfil você deseja ver.",
            required: false
        }
    ],

    run: async (client, interaction, args) => {
        let user = interaction.options.getUser("usuário") || interaction.user;

        let carteira = await db.get(`carteira_${user.id}`);
        let banco = await db.get(`banco_${user.id}`);

        if (carteira === null) carteira = 0;
        if (banco === null) banco = 0;

        let embed = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setTitle(`Perfil de ${user.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: "💸 Carteira", value: `\`${carteira} moedas\``, inline: true },
                { name: "🏦 Banco", value: `\`${banco} moedas\``, inline: true }
            );

        interaction.reply({ embeds: [embed] });
    }
};
