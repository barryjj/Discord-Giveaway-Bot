# Discord-Giveaway-Bot
Bot to run automated giveaways in a discord server.

# auth.json
In order to run this project, you will need to create an auth.json file in the root directory containing the following information:

auth.json:
```javascript
{
   "token": "YOUR-BOT-TOKEN",
   "channel": "YOUR-CHANNEL-ID"
}
```

# NPM Libaries:
You will need to run the following NPM command in the root directory of your install before starting the bot.

```
npm install discord.io lodash https://github.com/woor/discord.io/tarball/gateway_v6 winston --save
```