'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TestSchema = new Schema({
 nombre : 'string'

});


module.exports = mongoose.model('Tests', TestSchema);

