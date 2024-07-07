let Discord = require('discord.js')

module.exports = {
    name: "hack",
    description: "Comando para hackeares alguém",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "pessoa",
            description: "Menciona que queres hackear",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        }
    ],

    run: async (client, interaction) => {
        let dominio = [
            "discord",
            "dnvqa",
            "gmail",
            "colon",
            "madruga",
            "libre",
            "tk",
            "outlook",
            "moonjvnq",
            "hotmail",
            "nordvpn",
            "env",
            "botkK",
            "mine",
            "cringe"
        ]
        
       let final = [
            ".tk",
            ".com",
            ".anom",
            ".zip",
            ".jack",
            ".youtube",
            ".google",
            ".craft"
       ]
       let senhas = [
        "senha123",
        "paocomovo19",
        "jvnqlindo",
        "moonkasedragao",
        "creeperfofo",
        "maisumidiota",
        "eusimplesmentenaoexisto",
        "porquenao"
       ]
       let Email = [
        "paumdaquebrada@",
        "souburo103@",
        "seeusoubesenaoteriacomprado@",
        "voceemuitoidiotadeacreditarnisso@",
        "hacker138@",
        "sounotch.103738@",
        "alexaemaravilhosa@",
        "jvgataoemoonkasedragao@",
        "applelixo@",
        "androidfoda@",
        "ferakkk@",
        "deacordo@",
        "paulinholokofake1123@",
        "goabacapeta@",
        "jazzghostjegue@"
       ]
let dominio2 = dominio[Math.floor(Math.random() * dominio.length)]
let mail = Email[Math.floor(Math.random() * Email.length)]
let final2 = final[Math.floor(Math.random() * final.length)]
let senha = senhas[Math.floor(Math.random() * senhas.length)]
let final_email = `${mail}${dominio2}${final2}`
        let pessoa = interaction.options.getUser('pessoa')

        let aguarde = new Discord.EmbedBuilder()
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: true})})
        .setDescription(`**Vítima:** \`Hackeando...\`
        **ID:** \`Hackeando...\`
        **Email:** \`Hackeando...\`
        **Senha:** \`Hackeando...\``)
        .setTimestamp()
        .setThumbnail(pessoa.displayAvatarURL()) 
        .setColor('2b2d31');

        let embed = new Discord.EmbedBuilder()
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: true})})
        .setDescription(`**Vítima:** ${pessoa}
        **ID:** \`${pessoa.id}\`
        **Email:** \`${final_email}\`
        **Senha:** \`${senha}\``)
        .setTimestamp()
        .setThumbnail(pessoa.displayAvatarURL()) 
        .setColor('2b2d31');

        interaction.reply({embeds: [aguarde]}).then(() => {
            setTimeout(() => {
                interaction.editReply({embeds: [embed]})
            }, 4000)
        })



    }
}