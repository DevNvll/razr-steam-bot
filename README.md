# Razr Steam Bot
A Javascript powered Steam community bot


## Running

##### Install the dependencies
``npm install``

##### Configuring

The file ``config.json`` is where is stored the bot settings like the login info and default playing game.

``{``

 `` "username": "STEAM USERNAME",``
  
 `` "password": "STEAM PASSWORD",``
  
  ``"defaultGames": ["440"],``
  
  ``"admins": ["76561198052893297"]``
  
``}``


##### Running

``npm start``

### Help

##### Logging in

Don't worry about the Steam Guard, the guard code will be prompted when you start the bot and a sentry hash file will be created so 
you don't need to type the SG code ever again.

##### Powered by 
[NodeJS](https://github.com/nodejs/node), [node-steam](https://github.com/seishun/node-steam) and [express](https://github.com/strongloop/express)
