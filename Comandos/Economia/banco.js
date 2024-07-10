const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "roubar-banco",
    description: "Tente roubar moedas do banco.",
    type: Discord.ApplicationCommandType.CHAT_INPUT,

    run: async (client, interaction, args) => {
        let thief = interaction.user;

        let thiefBalance = await db.get(`carteira_${thief.id}`);
        if (thiefBalance === null) thiefBalance = 0;

        let isJailed = await db.get(`jailed_${thief.id}`);
        if (isJailed) {
            return interaction.reply({ content: "Você está preso e não pode usar comandos de economia.", ephemeral: true });
        }

        let successChance = 0.1;
        let isSuccess = Math.random() < successChance;

        if (isSuccess) {
            let stolenAmount = Math.floor(Math.random() * 10000) + 5000; // Entre 5000 e 15000 moedas

            await db.add(`carteira_${thief.id}`, stolenAmount);

            let embed = new Discord.EmbedBuilder()
                .setColor("#00ff15")
                .setTitle("💸 Roubo ao Banco Bem-Sucedido!")
                .setDescription(`Você roubou \`${stolenAmount} moedas\` do banco.`)
                .setThumbnail(thief.displayAvatarURL({ dynamic: true }));

            interaction.reply({ embeds: [embed] });
        } else {
            let jailTime = 10 * 60 * 1000; // 10 minutos
            let bailAmount = Math.floor(5000 + Math.random() * 40000); // Fiança entre 3000 e 40000 moedas
            await db.set(`jailed_${thief.id}`, true);
            await db.set(`bail_${thief.id}`, bailAmount);
            setTimeout(async () => {
                await db.delete(`jailed_${thief.id}`);
                await db.delete(`bail_${thief.id}`);
            }, jailTime);

            let embed = new Discord.EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("❌ Roubo ao Banco Falhou!")
                .setDescription(`Você tentou roubar o banco, mas foi pego e preso por 10 minutos! Fiança: \`${bailAmount} moedas\`.`)
                .setThumbnail(thief.displayAvatarURL({ dynamic: true }));

            interaction.reply({ embeds: [embed] });
        }
    }
}
