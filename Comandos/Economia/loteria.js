const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "loteria",
    description: "Participe da loteria para tentar ganhar moedas.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {
        let user = interaction.user;
        let ticketPrice = 1000; // Preço do bilhete de loteria
        let userBalance = await db.get(`carteira_${user.id}`);
        
        if (userBalance === null) userBalance = 0;

        if (userBalance < ticketPrice) {
            return interaction.reply({ content: "Você não tem moedas suficientes para comprar um bilhete de loteria.", ephemeral: true });
        }

        // Subtrair o preço do bilhete do saldo do usuário
        await db.sub(`carteira_${user.id}`, ticketPrice);

        let prizeAmount = Math.floor(Math.random() * 10000) + 1;
        let chance = Math.random();

        if (chance < 0.3) {
            let embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setTitle("💸 Loteria")
                .setDescription(`Infelizmente você não ganhou nada dessa vez. Você perdeu \`${ticketPrice} moedas\`.`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true }));

            interaction.reply({ embeds: [embed] });
        } else {
            await db.add(`carteira_${user.id}`, prizeAmount);

            let embed = new Discord.EmbedBuilder()
                .setColor("Gold")
                .setTitle("🎉 Loteria!")
                .setDescription(`Parabéns! Você ganhou \`${prizeAmount} moedas\` na loteria!`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true }));

            interaction.reply({ embeds: [embed] });
        }
    }
};
