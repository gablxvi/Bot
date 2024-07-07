const Discord = require('discord.js');

module.exports = {
  name: 'sorte',
  description: 'Abra um biscoito e veja sua sorte!',
  type: 1,

  async run(client, interaction, args) {
    const amor = Math.floor(Math.random() * 100) + 1
    const saude = Math.floor(Math.random() * 100) + 1
    const sorte = Math.floor(Math.random() * 100) + 1
    const dinheiro = Math.floor(Math.random() * 100) + 1
    const felicidade = Math.floor(Math.random() * 100) + 1;
    const criatividade = Math.floor(Math.random() * 100) + 1;
    const energia = Math.floor(Math.random() * 100) + 1;

    const messages = [
      "Você terá um dia incrível cheio de surpresas!",
      "Sua sorte está nas alturas hoje, aproveite!",
      "Prepare-se para receber boas notícias em breve.",
      "A sorte está do seu lado, siga em frente com confiança.",
      "Grandes oportunidades estão a caminho, fique atento!",
      "A sorte sorri para aqueles que se esforçam, e você tem se esforçado muito!",
      "Seu caminho está iluminado pela sorte e pela positividade.",
      "Um vento de sorte está prestes a soprar em sua direção.",
      "Acredite em si mesmo e sua sorte nunca acabará.",
      "Hoje é o dia perfeito para correr riscos, a sorte está ao seu lado.",
      "Sua jornada está cheia de possibilidades e oportunidades.",
      "A sorte é o resultado da preparação encontrando a oportunidade.",
      "Acredite no impossível e a sorte encontrará o seu caminho.",
      "Sorria para o mundo, a sorte seguirá seu exemplo.",
      "A sorte é a recompensa da persistência.",
      "A sorte está sempre presente para aqueles que acreditam.",
      "Seja ousado, a sorte favorece os audaciosos.",
      "A sorte está aí, você só precisa reconhecê-la.",
      "A sorte seguirá seus passos enquanto você segue seus sonhos.",
      "Cada novo dia traz consigo a chance de sorte e sucesso."
    ];

const message = messages[Math.floor(Math.random() * messages.length)];
    
const emoji = ':natal_biscoito_bx:'
    
    const embed = new Discord.EmbedBuilder()
    .setDescription(`${emoji} O seu biscoito da sorte diz:\n**${message}**\n\n**Suas previsões são:**\n❤️ **Amor:** ${amor}%\n💉 **Saúde:** ${saude}%\n🍀 **Sorte:** ${sorte}%\n💸 **Dinheiro:** ${dinheiro}%\n😁 **Felicidade:** ${felicidade}%\n🎭 **Criatividade:** ${criatividade}%\n⚛️ **Energia:** ${energia}%`)
    .setColor('#000000')
    
 await interaction.reply({ embeds: [embed]})
  }
}