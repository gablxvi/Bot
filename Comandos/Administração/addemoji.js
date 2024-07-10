const { PermissionFlagsBits, ApplicationCommandOptionType, parseEmoji } = require("discord.js");

module.exports = {
    name: "addemoji",
    description: "Adicione vários emojis de uma vez",
    default_member_permissions: [PermissionFlagsBits.Administrator],
    options: [
        {
            name: "emojis",
            description: "Coloque qualquer emoji, um ou vários",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    run: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) return interaction.reply({content:`⛔ | Permissão Negada`, ephemeral:true});


        await interaction.deferReply()

        const Emojis = interaction.options.getString("emojis");
        const emojiRegex = /<a?:(.*?):(\d+)>/g;
        const emojiMatches = Emojis.match(emojiRegex);

        if (!emojiMatches) {
            return interaction.editReply({ content: "Nenhum emoji válido encontrado .", ephemeral: true });
        }

        const addedEmojis = [];

        for (const emojiString of emojiMatches) {
            const parsed = parseEmoji(emojiString);
            const link = `https://cdn.discordapp.com/emojis/${parsed.id}${parsed.animated ? '.gif' : '.png'}`;

            try {
                const emoji = await interaction.guild.emojis.create({ attachment: link, name: parsed.name });
                addedEmojis.push(emoji);
            } catch (error) {
                console.error(error);
                return interaction.editReply({ content: `Erro ao adicionar o emoji:${parsed.name}.`, ephemeral: true });
            }
        }

        if (addedEmojis.length > 1) {
            const addedEmojiNames = addedEmojis.map(emoji => `${emoji}`).join(" ");
            await interaction.editReply({ content: `Emojis adicionados com sucesso: ${addedEmojiNames}`, });
        } else if (addedEmojis.length === 1) {
            await interaction.editReply({ content: `${addedEmojis} | Emoji adicionado com sucesso!`, });
        }

    }
}