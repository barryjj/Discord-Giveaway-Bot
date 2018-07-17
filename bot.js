var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

var StatusMessageArray = ['Eating stray cats to build energy.',
                          'Bathing in the blood of the innocent.', 
                          'Focusing darkness around specified targets.'];

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !summon
            case 'summon':
                bot.sendMessage({
                    to: channelID,
                    message: 'Currently unable to open a portal to Hell.  Try again later.'
                });
            break;
            
            // !status
            case 'status':
              var i = Math.floor(Math.random() * Math.floor(StatusMessageArray.length));
                bot.sendMessage({
                  to: channelID,
                  message: StatusMessageArray[i]
                });
            break;
            
            // unrecognized command
            default:
              bot.sendMessage({
                to: channelID,
                message: 'Request outside of the parameters of demonic contract.'
              });
         }
     }
});