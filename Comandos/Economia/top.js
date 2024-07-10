const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "top-money",
    description: "Mostra o ranking dos usuários mais ricos.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {
        let allData = await db.all();

        let walletKeys = allData.filter(entry => entry.id.startsWith("carteira_"));

        let allUsers = walletKeys.map(entry => {
            let userId = entry.id.split("_")[1];
            let balance = entry.value;

            return { userId, balance };
        });

        allUsers.sort((a, b) => b.balance - a.balance);
        allUsers = allUsers.slice(0, 10);

        let embed = new Discord.EmbedBuilder()
            .setColor("#fff700")
            .setTitle("💰 Top 10 Usuários Mais Ricos")
            .setDescription("Aqui estão os usuários com mais moedas no servidor:");

        for (let i = 0; i < allUsers.length; i++) {
            let user = await client.users.fetch(allUsers[i].userId);
            embed.addFields({
                name: `${i + 1}. ${user ? user.tag : `<@${allUsers[i].userId}>`}`,
                value: `Moedas: \`${allUsers[i].balance}\``
            });
        }

        interaction.reply({ embeds: [embed] });
    }
};
