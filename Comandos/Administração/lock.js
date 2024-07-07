const { ApplicationCommandType } = require("discord.js");

module.exports = {
    name: "lock",
    description: "Utilize para trancar um canal",
    type: ApplicationCommandType.ChatInput,

    run: async(client, interaction) => {

        if (!interaction.member.permissions.has("ManageChannels"))
            return interaction.reply(`Você não possui a permissão \`Genrenciar Canais\` para poder uttilizar este comando.`);

        if(!interaction.guild.members.me.permissions.has("ManageChannels"))
            return interaction.reply("Parece que estou sem permissões suficientes!");

            interaction.reply(`Este chat foi trancado com sucesso.`).then(() => {
                interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false })
            }).catch(err => {
                interaction.reply("Houve algum erro! Error: "+err);
            });

    },
}