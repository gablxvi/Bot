const { Discord, ApplicationCommandOptionType } = require('discord.js');
const { Minesweeper } = require('discord-gamecord'); 
  module.exports = {
    name: "mina",
    description: "Jogue o jogo mina de bombas!",
    run: async(client, interaction, args) => {
 const Game = new Minesweeper({ 
   message: interaction, 
   isSlashGame: true, 
   embed: { 
     title: 'Mina de bombas', 
     color: '#5865F2', 
     description: 'Clique em algum botão para jogar.' 
   }, 
   emojis: { flag: '🚩', mine: '💣' }, 
   mines: 5, 
   timeoutTime: 60000, 
   winMessage: 'Parabéns! Você Ganhou, conseguiu cavar todas as partes sem explodir.', 
   loseMessage: 'Você Perdeu, após você cavando, acabou caindo na bomba.', 
   playerOnlyMessage: 'Apenas {player} pode usar estes botões' 
 }); 
  
 Game.startGame(); 
 Game.on('gameOver', result => { 
   console.log(result);
 });
    }
  }