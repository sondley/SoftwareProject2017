'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
  
  name: 'String',
  category: 'String',
  description: 'String',
  price: 'String',
  weight:'String',
  currency:"String",
  height:'String',
  measure_weight: 'String',
  measure_height:'String',
  url:'String'
  
});

module.exports = mongoose.model('Products', ProductSchema);
