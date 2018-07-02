const Discord = require('discord.js');
var bot = new Discord.Client();
const prefix ='!';
const ownerID = '460775472247078912';
const active = new Map();

bot.on('message', message => {

    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if(message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (sender.bot) return;
    if (!message.content.startsWith(prefix)) return;

    //Les commandes
    try{

        let ops = {
            ownerID: ownerID,
            active: active
        }

        let commandFile = require(`./commandes/${cmd}.js`);
        commandFile.run(bot, message, args, ops);

    } catch(e){  //Catch toutes les erreurs

        console.log(e.stack);

    } finally {
        console.log(`${message.author.username} commande éxécutée: ${cmd}`)
    }

    //Lecture du script ping.js
    if (message === prefix + 'ping'){
    }

    //Lecture du script play.js
    if (message === prefix + 'play'){
    }
    //Lecture du script leave.js
    if (message === prefix + 'leave') {
    }

    if (message === prefix + 'gif') {
    }
});

bot.on('ready', () => {
    bot.user.setActivity("Bloopi, !help")
    console.log("Le Bot est fonctionnel !");
});

bot.login('NDYwNzc1NDcyMjQ3MDc4OTEy.DhJ01Q.pLdgRHaZG3jL6b6VGbBa3P_eU-4');


