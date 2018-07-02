const ytdl = require('ytdl-core');



exports.run = async (bot, message, args, ops)=> {

  //Vérif si un utilisateur est connecté a un chat vocal  
  if (!message.member.voiceChannel) return message.channel.send('Connecter vous au channel Musique');
  //Si il n'est pas connecté a un chat vocal envoie d'un message dans le chat general
  
  //Verif si l'utilisateur a insérer une url
  if (!args[0]) return message.channel.send('Désolé, veuillez entrer une url ');
    
  //Validation de l'info avec l'argument
  let validate = await ytdl.validateURL(args[0]);

  //Verif validation
  if(!validate) return message.channel.send('Désolé, url non valide');

  

  let info = await ytdl.getInfo(args[0]);

  let data = ops.active.get(message.guild.id) || {};

  if (!data.connection) data.connection = await message.member.voiceChannel.join();
  if (!data.queue) data.queue = [];
  data.guildID = message.guild.id;


  data.queue.push({
      Title: info.title,
      requester: message.author.tag,
      url: args[0],
      announceChannel: message.channel.id
  });

  if (!data.dispatcher) play(bot, ops, data);
  else {
    message.channel.send(`🎶 Ajouté a la liste d'attente: ${info.title} | Proposé par: ${message.author.tag} 🎶`)
  }

  ops.active.set(message.guild.id, data);

}

async function play(bot, ops, data) {
  bot.channels.get(data.queue[0].announceChannel).send(`🎶 En train de lire: ${data.queue[0].Title} | Proposé par: ${data.queue[0].requester} 🎶`);

  data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: 'audioonly'}));
  data.dispatcher.guildID = data.guildID;

  data.dispatcher.once('finish', function() {

      finish(bot, ops, this);
  });
}

function finish(bot, ops, dispatcher) {

  let fetched = ops.active.get(dispatcher.guildID);

  fetched.queue.shift();

  if (fetched.queue.length > 0) {

    ops.active.set(dispatcher.guildID, fetched);

    play(bot, ops, fetched);
  } else {

    ops.active.delete(dispatcher.guildID);

    let vc = bot.guilds.get(dispatcher.guildID).me.voiceChannel;
    if(vc) vc.leave();

  }


}
