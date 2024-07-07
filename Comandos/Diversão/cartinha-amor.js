const Discord = require('discord.js');

module.exports = {
    name: "correio",
    description: "Mande uma Cartinha pra sua Crush",
    type: Discord.ApplicationCommandType.ChatInput,

    options: [
        {
            name: "usuario",
            description: "Mencione a pessoa!",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        }, {
            name: "mensagem",
            description: "Escreva alguma coisa!",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction) => {

        const user = interaction.options.getUser("usuario")
        const memberTarget = interaction.guild.members.cache.get(user.id)
        const message = interaction.options.getString("mensagem")

            const help = new Discord.EmbedBuilder()
            .setColor('Red')
            .setDescription('Escolha o metodo que quer enviar a sua mensagem')

            const botoes = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                .setStyle("Primary")
                .setCustomId("privado")
                .setLabel("🔒・Privado"),
                new Discord.ButtonBuilder()
                .setStyle("Primary")
                .setCustomId("chat")
                .setLabel("💭・Chat")
            )

            interaction.reply({
                embeds: [help],
                components: [botoes],
                ephemeral: true
            }).then(msg => {
                const filtro = (i) => i.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({
                    componentType: Discord.ComponentType.Button,
                    filter: filtro,
                    max: 1
                })

                collector.on("collect", async (m) => {

                    if (m.customId === "privado") {
                        const privado = new Discord.EmbedBuilder()
                        .setTitle('Mensagem Privada')
                        .setColor('Red')
                        .setDescription(`**Para** › ${user}\n\n Mensagem: **${message}**`)

                        m.channel.send({
                            content: `${interaction.user}, Mensagem Enviada com Sucesso`,
                            ephemeral: true
                        }).then(msg => {
                            user.send({
                                embeds: [privado]
                            }).catch(e => {
                                msg.edit({
                                    content: '**Privado Bloqueado**, Não foi possivel enviar essa mensagem!',
                                    ephemeral: true
                                })
                            })
                        })
                    }

                    if (m.customId === "chat") {
                        const chat = new Discord.EmbedBuilder()
                        .setTitle('Mensagem')
                        .setColor('Red')
                        .setDescription(`**Para** › ${user}\n\n Mensagem: **${message}**`)

                        m.channel.send({
                            embeds: [chat]
                        })
                    }
                })
            })  
    }
}