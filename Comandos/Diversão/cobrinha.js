const { Discord, ApplicationCommandOptionType } = require('discord.js');
const { Snake } = require('discord-gamecord');
const config = require("../../index.js");

module.exports = {
  name: "cobrinha",
  description: "Minigame da Cobrinha",
  type: ApplicationCommandOptionType.ChatInput,
  
  run: async (client, interaction, args) => {
    const Game = new Snake({
      message: interaction,
      isSlashGame: false,
      embed: {
        title: 'Jogo da cobrinha',
        overTitle: 'Você perdeu!',
        color: (config.embedgeral)
      },
      emojis: {
        board: '⬛',
        food: '🍎',
        up: '⬆️', 
        down: '⬇️',
        left: '⬅️',
        right: '➡️',
      },
      snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
      foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
      stopButton: 'parar',
      timeoutTime: 60000,
      playerOnlyMessage: 'Somente {player} pode usar esses botões.'
    });

    Game.startGame();
    Game.on('gameOver', result => {
      console.log(result);  // => { result... }
    });
  }
};
