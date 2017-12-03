'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var customerFieldSchema = new Schema({
  
  userId:'String',
  fieldName:'String',
  fieldValue:'String',
  entity:'String'
  
});

module.exports = mongoose.model('customerfields', customerFieldSchema);