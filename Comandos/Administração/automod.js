const Discord = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
module.exports = {
    name: "automod",
    description: "Habilitar o automod.", 
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "palavra",
            description: "Palavra a ser bloqueada, se tiver mais de uma coloque assim, exemplo: (ruim,horrivel)",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
    ],
  
    run: async (client, interaction) => {

        

        try {
            if(!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
                return interaction.reply({content: "Voce nao tem permissao para executar este comando :x:", ephemeral: true})
            }
    
    
    
            const word = interaction.options.getString("palavra").split(",").map(palavra => palavra.trim());
    
            
    
            const rule = interaction.guild.autoModerationRules.create({
                name: `Automod`,
                creatorId: `id`,
                enabled: true,
                eventType: 1,
                triggerType: 1,
                triggerMetadata:
                    {
                        keywordFilter: word
                    },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                customMessage: 'Palavra bloqueada, cuidado no que escreve bobinho!'
                            }
                        }
                    ]
            })
    
            interaction.reply({content: `AutoMod habilitado, palavras inseridas: **${word}**`, ephemeral: true})
        } catch (error) {
            return interaction.reply({content: `Um erro ocorreu, talvez tenha atingido o maximo de regras que posso criar\n\ **Lembrando, quer colocar mais de uma palavra? coloque assim: palavra1,palavra2** *${error}*`})
        }

    


    }
  }