const Discord = require("discord.js")

module.exports = {
    name: 'cachorros',
    description: 'Cachorros fofos!',
    options: [
        {
            name: 'usuário',
            description: 'Selecione um usuário',
            type: Discord.ApplicationCommandOptionType.User,
            required: false,
        }
    ],
    run: async (client, interaction, args) => {
        let usuario = interaction.options.getUser('usuário') || interaction.user;

        var lista = [
           'https://c.tenor.com/nEsdZ0qa6QcAAAAM/dog.gif',
           'https://acegif.com/wp-content/uploads/gif/smiling-dog-4.gif',
           'https://i.pinimg.com/originals/18/b4/ec/18b4ecfc631198ffbf28a33ce2e89a62.gif',
           'https://i.pinimg.com/originals/aa/44/f4/aa44f4209b78579b5c56f9cd36d6d790.gif',
           'https://cdn.dicionariopopular.com/imagens/cachorro-piscando.gif',
           'https://soupetropolis.com/wp-content/uploads/2018/01/gif-cachorro_19.gif',
           'https://c.tenor.com/NaKTdVeHT3cAAAAC/doggo-confused.gif',
           'https://i.gifer.com/KHA.gif',
           'https://i.gifer.com/7cv.gif',
           'https://upgifs.com//img/gifs/ZA8Kfdily7mP6.gif',
           'https://64.media.tumblr.com/f4ef551de8abee293deeca394e235437/8eb57e37a7f87aac-8d/s250x250_c1/57ebcc0332b64f114f9bcd1d596d96ae14b6f660.gifv',
           'https://64.media.tumblr.com/4feef1fc5cb42e5e399672906099346c/8eb57e37a7f87aac-d9/s250x250_c1/8d2bd62c44fee5ba87cdfdd8d0a69ae5a2a972ea.gifv',
           'https://c.tenor.com/cPsgQUyPeCIAAAAd/corgi-dog.gif',
           'https://c.tenor.com/4damFwOhcMYAAAAC/doggo-corgi.gif',
           'https://c.tenor.com/s_s3xS3O9d0AAAAC/corgi-blanket.gif',
           'https://t1.ea.ltmcdn.com/pt/posts/5/6/9/_22965_4_orig.gif',
           'https://claudia.abril.com.br/wp-content/uploads/2020/01/gif-cachorro_25.gif'

        ];


        var r = lista[Math.floor(Math.random() * lista.length)];

        let embed = new Discord.EmbedBuilder()
            .setDescription(`**${usuario.username} Olha que cachorro fofo 🐶**`)
            .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setImage(`${r}`)
            .setColor("2b2d31")
            .setTimestamp()
            .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }), })

        interaction.reply({
            embeds: [embed]
            }
        )
    }
}