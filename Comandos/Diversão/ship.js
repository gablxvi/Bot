const { Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const block = "⬛";
const heart = ":red_square:";
const { obterTodosEmojis, obterEmoji, verificarEmoji } = require("../../handler/EmojiFunctions");


module.exports = {
    name: "ship",
    description: "Descubra o quanto 2 pessoas se amam!",
    category: "Fun",
    options: [
        {
            name: "user",
            description: "O primeiro usuário.",
            type: 6,
            required: true,
        },
        {
            name: "user2",
            description: "O segundo usuário.",
            required: true,
            type: 6
        },
    ],

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    run: async(client, interaction) => {

        const user1 = interaction.options.getUser("user")
        const user2 = interaction.options.getUser("user2")

        const embed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`${obterEmoji(31)} **__Teremos um novo casal aqui?__** ${obterEmoji(31)}`)
            .setImage(`https://api.popcat.xyz/ship?user1=${user1.displayAvatarURL({ dynamic: false, extension: "png" })}&user2=${user2.displayAvatarURL({ dynamic: false, extension: "png" })}`)
            .addFields(
                { name: `Membro 1`, value: `****${user1}****`, inline: true },
                { name: `Membro 2`, value: `****${user2}****`, inline: true },
                { name: `**Medidor**`, value: ship() },
                )
        try {
            return interaction.reply({ embeds: [embed] })
        } catch (error) {
            return interaction.Editreply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(`${obterEmoji(2)} | Um erro ocorreu`)
                    .setColor("Red")
                ], ephemeral: true
            })
        }
        function ship() {
            const hearts = Math.floor(Math.random() * 105) + 0;
            const hearte = (hearts / 10)

            const str = `${heart.repeat(hearte)}${block.repeat(11 - hearte)} ${hearts}%`;
            return str;
        }

    }
}