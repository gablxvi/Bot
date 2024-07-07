const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "player",
    description: "Vê a skin de um player (Apenas minecraft original)",
    options: [{
        name: "username",
        description: "Escreve o username do player",
        type: ApplicationCommandOptionType.String,
        required: true
    }], run: async(Client, interaction) => {

        const API_URL = 'https://api.mojang.com/users/profiles/minecraft';
        const playerName = interaction.options.getString("username");

        try {

            const { data: uuidData } = await axios.get(`${API_URL}/${playerName}`);

            if (!uuidData) {
                return interaction.reply({content:"O jogador especificado não existe!",ephemeral:true});
            }

            const playerUUID = uuidData.id;
            const { data: playerData } = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${playerUUID}`);

            if (!playerData) {
                return interaction.reply({content:"Não foi possível buscar informações sobre o jogador!",ephemeral:true});
            }

            const playerProperties = playerData.properties;
            const playerSkin = JSON.parse(Buffer.from(playerProperties[0].value, 'base64').toString());
            const fullPlayerSkin = `https://crafatar.com/renders/body/${playerUUID}`
            
            const playerEmbed = new EmbedBuilder()
                .setColor("Green")
                .setTitle(playerData.name)
                .setThumbnail(playerSkin.textures.SKIN.url)
                .setImage(fullPlayerSkin)
                .addFields(
                    { name: 'ID do jogador', value: playerData.id },
                );
            interaction.reply({embeds:[playerEmbed]});

        } catch(err) {
            console.log(err)
            interaction.reply({content:"Ocorreu um erro ao procurar informações sobre o player, verifique se introduziu o nickname corretamente.", ephemeral: true})
        }
    }
}