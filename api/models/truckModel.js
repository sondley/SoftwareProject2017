'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TruckSchema = new Schema({
  
  DriverId:'String',
	DriverName:'String',
		Capacity:'String',


  
});

module.exports = mongoose.model('Trucks', TruckSchema);
