app.factory('deepstream', [function() {
   function getClient() {
     var client = deepstream('localhost:6021' )
     client.login({ username: 'ds-simple-input-' + client.getUid() });
     return client;
   }

    return {
      getClient: getClient
    }
  }]);
