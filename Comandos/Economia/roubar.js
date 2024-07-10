const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
    name: "roubar",
    description: "Tente roubar moedas de outro usuário.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Usuário de quem você deseja roubar moedas.",
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        let thief = interaction.user;
        let target = interaction.options.getUser("usuário");

        if (target.id === thief.id) {
            return interaction.reply({ content: "Você não pode roubar moedas de si mesmo.", ephemeral: true });
        }

        let thiefBalance = await db.get(`carteira_${thief.id}`);
        if (thiefBalance === null) thiefBalance = 0;

        let targetBalance = await db.get(`carteira_${target.id}`);
        if (targetBalance === null) targetBalance = 0;

        if (targetBalance <= 0) {
            return interaction.reply({ content: "O usuário alvo não tem moedas para serem roubadas.", ephemeral: true });
        }

        let isJailed = await db.get(`jailed_${thief.id}`);
        if (isJailed) {
            return interaction.reply({ content: "Você está preso e não pode usar comandos de economia.", ephemeral: true });
        }

        let successChance = 0.2;
        let isSuccess = Math.random() < successChance;

        if (isSuccess) {
            let stolenAmount = Math.floor(targetBalance * (0.1 + Math.random() * 0.4));
            if (stolenAmount <= 0) stolenAmount = 1;

            await db.sub(`carteira_${target.id}`, stolenAmount);
            await db.add(`carteira_${thief.id}`, stolenAmount);

            let embed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setTitle("💸 Roubo bem-sucedido!")
                .setDescription(`Você roubou \`${stolenAmount} moedas\` de ${target.username}.`)
                .setThumbnail(thief.displayAvatarURL({ dynamic: true }));

            interaction.reply({ embeds: [embed] });

            let embedTarget = new Discord.EmbedBuilder()
                .setColor("Red")
                .setTitle("💸 Você foi roubado!")
                .setDescription(`${thief.username} roubou \`${stolenAmount} moedas\` de você.`)
                .setThumbnail(target.displayAvatarURL({ dynamic: true }));

            target.send({ embeds: [embedTarget] }).catch(() => {
                console.log(`Não foi possível enviar uma mensagem direta para ${target.username}`);
            });
        } else {
            let jailTime = 5 * 60 * 1000; // 5 minutos
            let bailAmount = Math.floor(3000 + Math.random() * 40000); // Fiança entre 1000 e 5000 moedas
            await db.set(`jailed_${thief.id}`, true);
            await db.set(`bail_${thief.id}`, bailAmount);
            setTimeout(async () => {
                await db.delete(`jailed_${thief.id}`);
                await db.delete(`bail_${thief.id}`);
            }, jailTime);

            let embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setTitle("❌ Roubo falhou!")
                .setDescription(`Você tentou roubar moedas de ${target.username}, mas foi pego e preso por 5 minutos! Fiança: \`${bailAmount} moedas\`.`)
                .setThumbnail(thief.displayAvatarURL({ dynamic: true }));

            interaction.reply({ embeds: [embed] });
        }
    }
}
