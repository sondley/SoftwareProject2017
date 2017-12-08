'use strict';
module.exports = function(app) {
  var todoProduct = require('../controllers/ProductsControllers');

  // todoProduct Routes
  app.route('/products')
    .get(todoProduct.list_all_products)
    .post(todoProduct.create_a_product);
    


   app.route('/products/:productId')
    .get(todoProduct.read_a_product)
    .put(todoProduct.update_a_product)
    .delete(todoProduct.delete_a_product);
    
};
