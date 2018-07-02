exports.run = (bot, message, args, ops)=> {

    //Verif si l'utilisateur est connecté au channel vocal
    if (!message.member.voiceChannel) return message.channel.send('Merci de vous connecter au channel musique');

    //Verif si le bot est connecté au channel vocal
    if (!message.guild.me.voiceChannel) return message.channel.send('Désolé, mais le bot est connecté a aucun channel');

    //Verif si l'utilisateur et le bot sont dans le même channel vocal
    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('Désolé, le bot est connecté a un channel différent');

    //Leave channel
    message.guild.me.voiceChannel.leave();

    //Envoie message
    message.channel.send('Bloopi viens de se déconnecter du channel !');


}
