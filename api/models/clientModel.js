'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ClientSchema = new Schema({
  
  firstname:'String',
lastname:'String',
company:'String',
email:'String',
phone:'String',
mobile:'String',
display_name:'String',
website:'String',
address: { street:'String',city:'String',state:'String',
country:'String' },
location: { latitude: 'String',  longitude: 'String' },
is_shipping_addres:Boolean
  
});

module.exports = mongoose.model('Clients', ClientSchema);

