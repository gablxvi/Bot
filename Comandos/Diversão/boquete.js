const Discord = require('discord.js')
module.exports = {
    name: "boquete",
    description: "Faça um boquete em um membro.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "membro",
            description: "Mencione um usuário",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("membro")

        var lista1 = [
            'https://cdn.discordapp.com/attachments/1259945478187909182/1260127154428182549/bee8c69387aeadf21b33e17ae20bc605.gif?ex=668e305d&is=668cdedd&hm=e132bfff9d3058f79d43ca51fd8fbbc9fabd97aa402c0fb3036f9933c538af15&',
            'https://media.discordapp.net/attachments/1213537897794506852/1260128147328995368/25bd4d2c2bb466a2b10e66c045d8e9f7.gif?ex=668e314a&is=668cdfca&hm=c913c3ac2c3dd3350b23f50eae27ff6e40a488e112c5fa7a6c70d32f5221e815&=',
        ];

        var lista2 = [
            'https://cdn.discordapp.com/attachments/1259945478187909182/1260127154428182549/bee8c69387aeadf21b33e17ae20bc605.gif?ex=668e305d&is=668cdedd&hm=e132bfff9d3058f79d43ca51fd8fbbc9fabd97aa402c0fb3036f9933c538af15&',
        ];

        var random1 = lista1[Math.floor(Math.random() * lista1.length)];
        var random2 = lista2[Math.floor(Math.random() * lista2.length)];

        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} Fez um boquete em ${user}.**`)
            .setImage(`${random1}`)
            .setColor("2b2d31")

        const button = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('1')
                    .setLabel('Retribuir')
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setDisabled(false)

            )

        const embed1 = new Discord.EmbedBuilder()
            .setDescription(`**${user} Retribuiu o boquete de ${interaction.user}.**`)
            .setColor("2b2d31")
            .setImage(`${random2}`)

        interaction.reply({ embeds: [embed], components: [button] }).then(() => {
            const filter = i => i.customId === '1' && i.user.id === user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

            collector.on('collect', async i => {
                if (i.customId === '1') {
                    i.reply({ embeds: [embed1] })
                }
            });

            collector.on("end", () => {
                interaction.editReply({
                    components: [
                        new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId('1')
                                    .setLabel('Retribuir')
                                    .setStyle(Discord.ButtonStyle.Primary)
                                    .setDisabled(true)

                            )
                    ]
                })
            })
        })
    }
}
