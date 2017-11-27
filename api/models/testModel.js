'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TestSchema = new Schema({
 nombre : 'String'

});


module.exports = mongoose.model('Tests', TestSchema);

