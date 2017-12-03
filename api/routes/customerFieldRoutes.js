'use strict';
module.exports = function(app) {
  var todoCustomerFields = require('../controllers/customerFieldController');

  app.route('/customerfields')
    .get(todoCustomerFields.list_all_customerFields);

  app.route('/customerfields/:userId')
    .get(todoCustomerFields.list_user_custom_fields);
     
};