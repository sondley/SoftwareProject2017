'use strict';
module.exports = function(app) {
  var todoClient = require('../controllers/clientController');

  // todoProduct Routes
  app.route('/clients')
    .get(todoClient.list_all_clients)
    .post(todoClient.create_a_client);
    


   app.route('/clients/:clientId')
    .get(todoClient.read_a_client)
    .put(todoClient.update_a_client)
    .delete(todoClient.delete_a_client);


    
};