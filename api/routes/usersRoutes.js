'use strict';
module.exports = function(app) {
  var todoUsers = require('../controllers/usersController');

  // todoList Routes

    app.route('/test')
    .get(todoUsers.list_all_users)
    .post(todoUsers.create_a_user);


  app.route('/test/:userId')
    .get(todoUsers.read_a_user)
    .put(todoUsers.update_a_user)
    .delete(todoUsers.delete_a_user);
};