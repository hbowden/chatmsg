app.factory('xmpp', ['$http', function($http) {
  var url = "";

  function setupClient(jid, pass) {
    var client = new XMPP.Client({
      // websocket: { url: 'ws://localhost:5280/xmpp-websocket/' },
      bosh: {url: url},
      jid: jid,
      password: pass
    });
  }

  return {
    setupClient: setupClient
  }
}]);
