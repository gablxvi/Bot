const fs = require('fs');

// Caminho para o arquivo de cache
const cacheFilePath = 'emojis.json';

// Objeto para armazenar os emojis
let emojiCache = {};

// Função para carregar o cache de emojis do arquivo
function carregarCache() {
    try {
        const data = fs.readFileSync(cacheFilePath, 'utf8');
        emojiCache = JSON.parse(data);
    } catch (error) {
        // Se ocorrer um erro ao carregar o arquivo, o cache será iniciado vazio
        emojiCache = {};
    }
}

// Função para salvar o cache de emojis no arquivo
function salvarCache() {
    const data = JSON.stringify(emojiCache);
    fs.writeFileSync(cacheFilePath, data, 'utf8');
}

// Função para encontrar o próximo número disponível no cache
function encontrarProximoNumero() {
    let proximoNumero = 1;
    while (emojiCache[proximoNumero]) {
        proximoNumero++;
    }
    return proximoNumero;
}

// Função para adicionar emojis ao cache
function adicionarEmoji(emoji) {
    const proximoNumero = encontrarProximoNumero();
    emojiCache[proximoNumero] = emoji;
    salvarCache();
}

// Função para editar um emoji no cache
function editarEmoji(numero, novoEmoji) {
    if (numero in emojiCache) {
        emojiCache[numero] = novoEmoji;
        salvarCache();
    } else {
        console.log(`O emoji com número '${numero}' não está no cache.`);
    }
}

// Função para obter um emoji do cache
function obterEmoji(numero) {
    return emojiCache[numero] || null;
}

function obterTodosEmojis() {
    return Object.entries(emojiCache).map(([numero, emoji]) => `${numero} - ${emoji}`);
  }

  function verificarEmoji(numero) {
    return numero in emojiCache;
  }


module.exports = { obterEmoji, editarEmoji, adicionarEmoji, carregarCache, obterTodosEmojis, verificarEmoji };