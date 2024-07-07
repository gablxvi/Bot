const Discord = require('discord.js')

module.exports = {
    name: "8ball",
    description: "Pergunte algo",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "pergunta",
            description: "Faça uma pergunta.",
            type: Discord.ApplicationCommandOptionType.String,
            require: true
        },
    ],

run: async (client, interaction) => {
    
    const perguntas = interaction.options.getString("pergunta")

        let respostas = [
            'Sim',
            'Não',
            'Talvez',
            'Com certeza',
            'Provavelmente não'
            // adicione mais respostas
        ];

        let random = respostas[Math.floor(Math.random() * respostas.length)]

const embed = new Discord.EmbedBuilder()
            .setAuthor({
    name: `Pergunta feita: ${perguntas}\n Sendo sincera`, //se quiser, pode alterar essa parte...
    iconURL: 'https://i.pinimg.com/736x/21/e8/57/21e8577c7e7c57efb2a11a8fcd03e441.jpg',
    
  })
            .setColor("#ffffff")
            .setDescription(`${random}`);
  
        interaction.reply({embeds: [embed]})
 }
}