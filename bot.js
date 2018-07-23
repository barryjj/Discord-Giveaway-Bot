var discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

const _ = require('lodash');
const readline = require('readline');
const fs = require('fs');

var macroMap = {};

const lineReader = readline.createInterface({
  input: fs.createReadStream('macros.txt')
});

lineReader.on('line', function (line){
      var keypair = line.split(' ');
      macroMap[_.toLower(keypair[0])] = _.toLower(keypair[1]);
});

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
        switch(cmd) 
        {
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