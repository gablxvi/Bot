const { ApplicationCommandOptionType, AttachmentBuilder } = require('discord.js');
const { createCompletion } = require('openai');
const config = require("../../config.json");

module.exports = {
    name: 'chat', 
    description: 'Pergunte algo a openai', 

    options: [
        {
            name: "input",
            description: "O que você está se perguntando?",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const prompt = interaction.options.getString('input');
        await interaction.deferReply({ content: "Deixe-me pensar..." });

        try {
            const response = await createCompletion({
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 2048,
                temperature: 0.7,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            }, {
                apiKey: config.api
            });

            let responseMessage = '> ' + prompt + response.choices[0].text;

            
            if (responseMessage.length >= 2000) {
                const attachment = new AttachmentBuilder(Buffer.from(responseMessage, 'utf-8'), { name: 'response.txt' });
                await interaction.editReply({ files: [attachment] });
            } else {
                await interaction.editReply(responseMessage);
            }
        } catch (error) {
            console.error('Error communicating with OpenAI:', error);
            await interaction.editReply('Desculpe, houve um erro ao tentar obter uma resposta da OpenAI.');
        }
    },
};