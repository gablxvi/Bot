const Discord = require('discord.js')

module.exports = {
    name: "cantada",
    description: "Mande uma cantada para alguém.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            description: "Mencione um usuário.",
            type: Discord.ApplicationCommandOptionType.User,
            require: true
        }
    ],

    run: async (client, interaction) => {

        let cantadas = [
            'Quero te conquistar e não te ganhar, pois o que se ganha se perde e o que se conquista, jamais se é tirado...',
            'queria ser socrates mais o socrates nn posso ser pq ele dizia "so sei que nada sei" e eu so sei que quero vc',
        
        ]
        let usuario = interaction.options.getUser('usuário')
        let random = cantadas[Math.floor(Math.random() * cantadas.length)]

        const embed = new Discord.EmbedBuilder()
        .setTitle('Cantada')
        .setDescription(`O usuário ${interaction.user} enviou uma cantada para ${usuario}.
        
        😍 ${random}`)

        interaction.reply({embeds: [embed]})

    }
}