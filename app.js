var express = require('express');
var app = express();
var fs = require('fs');
var readline = require('readline');
var steam = require('steam');

//Configure the readline module
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//$Bot - The bot core //

//load config file into config var
config = JSON.parse(fs.readFileSync('config.json', 'utf8'))

//create steam client
var client = new steam.SteamClient();

//load the Bot API routes
require('./routes.js')(client, app, steam);

//check if sentry file exists and set a variable with
var sentryfile;
if(fs.existsSync('sentryfile.' + config.username + '.hash')) {
    sentryfile = fs.readFileSync('sentryfile.' + config.username + '.hash');
}

//log on to steam
client.logOn({
    accountName: config.username,
    password: config.password,
    shaSentryfile: sentryfile
});

client.on('error', function(e) {
    if (e.eresult == steam.EResult.AccountLogonDenied) { //if steam guard is required, prompt it on console
        rl.question('Steam Guard Code: ', function(code) {
            client.logOn({
                accountName: config.username,
                password: config.password,
                authCode: code
            });
        });
    } else {
        console.log('Steam Error: ' + e.eresult);

    }
});


//listen to the sentry file buffer and stores it into a hash file
client.on('sentry', function(sentry) {
    console.log('Got new sentry file hash from Steam.  Saving.');
    fs.writeFile('sentryfile.' + config.username + '.hash', sentry);
});


//when logged on into steam
client.on('loggedOn', function(logonResp) {
  console.log('Logged on to Steam');
  client.gamesPlayed(config.defaultGames);
  client.setPersonaState(steam.EPersonaState.Online); //set status to "Online"
});


//Create the server on port 80
app.listen(process.env.PORT || 80);
console.log('Bot Ready For Your Go');
