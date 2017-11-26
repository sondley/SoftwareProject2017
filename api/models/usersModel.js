'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
	  nombre:'String',
     appellido: 'String',
     
});




module.exports = mongoose.model('Users', UserSchema);
