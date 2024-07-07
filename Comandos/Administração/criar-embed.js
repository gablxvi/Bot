const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "create_embed",
  description: "Envie uma embed da forma que você quer",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "titulo",
      description: "Título da embed",
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: "descrição",
      description: "Descrição da embed",
      type: ApplicationCommandOptionType.String,
      required: false
    },
    {
        name: "color",
        description: "Cor para a embed (hexadecimal)",
        type: ApplicationCommandOptionType.String,
        required: false
      },
    {
      name: "imagem",
      description: "Imagem para embed (URL)",
      type: ApplicationCommandOptionType.String,
      required: false
    },
    {
      name: "footer",
      description: "Footer da embed",
      type: ApplicationCommandOptionType.String,
      required: false
    }
  ],
  run: async (client, interaction) => {

    const title = interaction.options.getString("titulo");
    const description = interaction.options.getString("descrição");
    const color = interaction.options.getString("color");
    const image = interaction.options.getString("imagem");
    const footer = interaction.options.getString("footer");

    if (image &&!isValidImageURL(image)) {
      interaction.reply({ content: "❌ | URL de imagem está inválida!", ephemeral: true });
      return;
    }

    if (color &&!isValidHexColor(color)) {
      interaction.reply({ content: "❌ | Isso não é uma cor hexadecimal válida!", ephemeral: true });
      return;
    }

    const embed = new EmbedBuilder()
   .setTitle(title);

    if (description) {
      embed.setDescription(description);
    }

    if (color) {
        embed.setColor(color);
      }

    if (image) {
      embed.setImage(image);
    }

    if (footer) {
      embed.setFooter({ text: footer });
    }

    interaction.channel.send({ embeds: [embed] });
    interaction.reply({ content: `✅ | Embed enviada com sucesso!`, ephemeral: true });
  }
};

function isValidImageURL(url) {
  try {
    const urlObject = new URL(url);
    return urlObject.protocol === "http:" || urlObject.protocol === "https:";
  } catch (e) {
    return false;
  }
}

function isValidHexColor(color) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}