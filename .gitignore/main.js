const Discord = require('discord.js');

var bot = new Discord.Client();

bot.on('ready', () => {
    bot.user.setGame("Bloopi, !help")
    console.log("Le Bot est fonctionnel !");
});

bot.login('NDYwNzc1NDcyMjQ3MDc4OTEy.DhJ01Q.pLdgRHaZG3jL6b6VGbBa3P_eU-4');


