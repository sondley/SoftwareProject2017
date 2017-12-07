'use strict';
module.exports = function(app) {
  var todoTruck = require('../controllers/truckController');

  // todoProduct Routes
  app.route('/trucks')
    .get(todoTruck.list_all_trucks)
    .post(todoTruck.create_a_truck);
    


   app.route('/trucks/:truckId')
    .get(todoTruck.read_a_truck)
    .put(todoTruck.update_a_truck)
    .delete(todoTruck.delete_a_truck);



    
};