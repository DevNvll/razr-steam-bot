module.exports = function (client, app, steam) {
  app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('Hi, I\'m Razr\'s steam bot.\n');
  });

  app.get('/play/:id', function(req, res) {
    res.type('text/plain');
    res.send('Now Playing: ' + req.params.id);
    client.gamesPlayed([parseInt(req.params.id)]);
    console.log('Now Playing: ' + req.params.id);
  });

  app.get('/profile/name/:name', function(req, res) {
    res.type('text/plain');
    res.send('New SteamBot name: ' + req.params.name);
    client.setPersonaName(req.params.name);
    console.log('New Steam name: ' + req.params.name);
  });

  app.get('/profile/state/:state', function(req, res) {
    if(req.params.state == 'Online') {
      client.setPersonaState(steam.EPersonaState.Online);
      res.type('text/plain');
      res.send('Status set to Online');
      console.log('Status set to Online');
    }
    else if(req.params.state == 'Offline') {
      client.setPersonaState(steam.EPersonaState.Offline);
      res.type('text/plain');
      res.send('Status set to offline');
      console.log('Status set to Offline');
    }
    else {
      res.type('text/plain');
      res.send('Invalid state');
      console.log('Invalid state');
    }
  });

  app.get('/message/:steamid/:message', function(req, res) {
    res.type('text/plain');
    res.send('Message sent to ' + req.params.steamid + ': ' + req.params.message);
    client.sendMessage(req.params.steamid, req.params.message);
    console.log('Message sent to ' + req.params.steamid + ': ' + req.params.message);
  });

  app.get('/friend/add/:steamid', function(req, res) {
    res.type('text/plain');
    res.send('Friend added: ' + req.params.steamid);
    client.addFriend(req.params.steamid);
    console.log('Friend added: ' + req.params.steamid);
  });

};
