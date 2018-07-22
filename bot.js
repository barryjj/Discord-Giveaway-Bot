var discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

const _ = require('lodash');

var macroMap = {
  headbang : 'https://media2.giphy.com/media/k3M5tUaoz65a0/giphy.gif',
  badsteve : 'https://i.gifer.com/8oQL.gif',
  homerhedge: 'https://media.giphy.com/media/3ohs7KViF6rA4aan5u/giphy.gif',
  wtfhedge: 'https://i.giphy.com/media/3ohs7N0iXvc180MiB2/giphy.webp',
  grandpahedge: 'https://media.giphy.com/media/2ALDsRipuShI8A3gXV/giphy.gif',
  dogsoon: 'https://media.giphy.com/media/5xtDarzgzG6eu6uVwI0/giphy.gif',
  grandpaturnaround: 'https://giphy.com/gifs/fDO2Nk0ImzvvW',
  howdareyou: 'https://78.media.tumblr.com/tumblr_m64dbowpB71qm7tbzo1_500.gif',
  revenge: 'https://media.giphy.com/media/6uu3nwQ1aD6t7DHotY/giphy.gif'
};


var statusMessageArray = ['Eating stray cats to build energy.',
                          'Bathing in the blood of the innocent.', 
                          'Focusing darkness around specified targets.'];

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize discord Bot
var bot = new discord.Client({
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
                    message: "Currently unable to open a portal to Hell.  Try again later."
                });
            break;
            
            // !status
            case 'status':
              var i = Math.floor(Math.random() * Math.floor(statusMessageArray.length));
                bot.sendMessage({
                  to: channelID,
                  message: statusMessageArray[i]
                });
            break;

            // !macro
            case 'macro':
              console.log("Macro request made for: " + args[0]);
              if (_.toLower(args[0]) in macroMap) 
              {
                bot.sendMessage({
                  to: channelID,
                  message: macroMap[_.toLower(args[0])]
                });
              }
              else if (_.toLower(args[0]) === _.toLower('list'))
              {
                macroList = "";
                for (key in macroMap)
                {
                    macroList = macroList + key + "\n";
                }

                bot.sendMessage({
                  to: channelID,
                  message: "**Macro list:**\n\n" + macroList
                });

              }
              else
              {
                bot.sendMessage({
                  to: channelID,
                  message: "Macro not recognized. Use !macro list to list available macros."
                });
              }
              break;

            
            // unrecognized command
            default:
              bot.sendMessage({
                to: channelID,
                message: "Request outside of the parameters of demonic contract."
              });
         }
     }
});