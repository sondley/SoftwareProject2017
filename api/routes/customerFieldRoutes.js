'use strict';
module.exports = function(app) {
  var todoCustomerFields = require('../controllers/customerFieldController');

  // todoProduct Routes
  app.route('/customerfields')
    .get(todoCustomerFields.list_all_customerFields)
    .post(todoCustomerFields.create_a_customerField);
    


   app.route('/customerFields/:customerFieldId')
    .get(todoCustomerFields.read_a_customerField)
    .put(todoCustomerFields.update_a_customerField)
    .delete(todoCustomerFields.delete_a_customerField);

    
};