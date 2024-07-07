const traduzir = require("@vitalets/google-translate-api")
const Discord = require("discord.js")

module.exports = {
    name: "traduzir",
    description: "Traduz uma palavra ou frase de sua escolha.",
    type: Discord.ApplicationCommandType.ChatInput,
    nameLocalizations: {"pt-BR": "traduzir", "en-US": "translate"},
    descriptionLocalizations: {"pt-BR": "Traduz uma palavra ou frase de sua escolha.", "en-US": "「Utility」Translates a word or phrase of your choice."},
    options: [
        {
            name: `de`,
            type: Discord.ApplicationCommandOptionType.String,
            description: `Qual é o idioma que sua frase/palavra está?`,
            nameLocalizations: {"pt-BR": "de", "en-US": "from"},
            descriptionLocalizations: {"pt-BR": "Qual é o idioma que sua frase/palavra está?", "en-US": "What language is your phrase/word in?"},
            required: true,
            choices: [
                { name: `Detecção automática`, value: `auto` },
                { name: `Português`, value: `pt` },
                { name: `Inglês`, value: `en` },
                { name: `Espanhol`, value: `es` },
                { name: `Francês`, value: `fr` },
                { name: `Alemão`, value: `de` },
                { name: `Italiano`, value: `it` },
                { name: `Russo`, value: `ru` },
                { name: `Chinês (simplificado)`, value: `zh-cn` },
                { name: `Japonês`, value: `ja` },
                { name: `Coreano`, value: `ko` },
                { name: `Árabe`, value: `ar` },
                { name: `Turco`, value: `tr` },
                { name: `Holandês`, value: `nl` },
                { name: `Polonês`, value: `pl` },
                { name: `Hindi`, value: `hi` },
                { name: `Sueco`, value: `sv` },
                { name: `Norueguês`, value: `no` },
                { name: `Dinamarquês`, value: `da` },
                { name: `Finlandês`, value: `fi` },
                { name: `Hebraico`, value: `he` },
                { name: `Indonésio`, value: `id` },
                { name: `Tailandês`, value: `th` },
                { name: `Grego`, value: `el` },
                { name: `Eslovaco`, value: `sk` },

            ]
        },
        {
            name: `para`,
            type: Discord.ApplicationCommandOptionType.String,
            description: `Qual é o idioma que sua frase/palavra deverá ser traduzida?`,
            nameLocalizations: {"pt-BR": "para", "en-US": "to"},
            descriptionLocalizations: {"pt-BR": "Qual é o idioma que sua frase/palavra deverá ser traduzida?", "en-US": "What language should your sentence/word be translated into?"},
            required: true,
            choices: [
                { name: `Português`, value: `pt` },
                { name: `Inglês`, value: `en` },
                { name: `Espanhol`, value: `es` },
                { name: `Francês`, value: `fr` },
                { name: `Alemão`, value: `de` },
                { name: `Italiano`, value: `it` },
                { name: `Russo`, value: `ru` },
                { name: `Chinês (simplificado)`, value: `zh-cn` },
                { name: `Japonês`, value: `ja` },
                { name: `Coreano`, value: `ko` },
                { name: `Árabe`, value: `ar` },
                { name: `Turco`, value: `tr` },
                { name: `Holandês`, value: `nl` },
                { name: `Polonês`, value: `pl` },
                { name: `Hindi`, value: `hi` },
                { name: `Sueco`, value: `sv` },
                { name: `Norueguês`, value: `no` },
                { name: `Dinamarquês`, value: `da` },
                { name: `Finlandês`, value: `fi` },
                { name: `Hebraico`, value: `he` },
                { name: `Indonésio`, value: `id` },
                { name: `Tailandês`, value: `th` },
                { name: `Grego`, value: `el` },
                { name: `Eslovaco`, value: `sk` },
                { name: `Malaio`, value: `ms` }
            ]
        },
        {
            name: `texto`,
            description: `O texto que deverá ser traduzido.`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            nameLocalizations: {"pt-BR": "texto", "en-US": "text"},
            descriptionLocalizations: {"pt-BR": "O texto que deverá ser traduzido.", "en-US": "The text to be translated"},
        },
    ],

    run: async (client, interaction) => {
        
        let texto = interaction.options.getString('texto')
        let de = interaction.options.getString('de')
        let para = interaction.options.getString('para')
        

        let idiomasPTBR = {
            pt: 'Português',
            en: 'Inglês',
            es: 'Espanhol',
            fr: 'Francês',
            de: 'Alemão',
            it: 'Italiano',
            ru: 'Russo',
            'zh-cn': 'Chinês (simplificado)',
            ja: 'Japonês',
            ko: 'Coreano',
            ar: 'Árabe',
            tr: 'Turco',
            nl: 'Holandês',
            pl: 'Polonês',
            hi: 'Hindi',
            sv: 'Sueco',
            no: 'Norueguês',
            da: 'Dinamarquês',
            fi: 'Finlandês',
            he: 'Hebraico',
            id: 'Indonésio',
            th: 'Tailandês',
            el: 'Grego',
            sk: 'Eslovaco',
            ms: 'Malaio',
        };
        let idiomasENUS = {
            pt: 'Portuguese',
            en: 'English',
            es: 'Spanish',
            fr: 'French',
            de: 'German',
            it: 'Italian',
            ru: 'Russian',
            'zh-cn': 'Chinese (Simplified)',
            ja: 'Japanese',
            ko: 'Korean',
            ar: 'Arabic',
            tr: 'Turkish',
            nl: 'Dutch',
            pl: 'Polish',
            hi: 'Hindi',
            sv: 'Swedish',
            no: 'Norwegian',
            da: 'Danish',
            fi: 'Finnish',
            he: 'Hebrew',
            id: 'Indonesian',
            th: 'Thai',
            el: 'Greek',
            sk: 'Slovak',
            ms: 'Malay',
          };
        
        let traduzido = await traduzir.translate(`${texto}`, { from: `${de}`, to: `${para}` });

        let locales = {
            'pt-BR': {
                title: `Tradução do texto`,
                description: `Texto original:\n\`\`\`${texto}\`\`\`\nTexto traduzido para **${idiomasPTBR[para]}**:\n\`\`\`${traduzido.text}\`\`\``,
            },
            'en-US': {
                title: `Text translation`,
                description: `Original text:\n\`\`\`${texto}\`\`\`\nText translated to **${idiomasENUS[para]}**:\n\`\`\`${traduzido.text}\`\`\``,
            },
        };

        let embed = new Discord.EmbedBuilder()
            .setTitle(locales[interaction.locale]?.title)
            .setDescription(locales[interaction.locale]?.description)
            .setColor("#5865f2");

            
        interaction.reply({ embeds: [embed] });
    }
}