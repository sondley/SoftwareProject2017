'use strict';


var mongoose = require('mongoose'),
  Truck = mongoose.model('Trucks');

exports.list_all_trucks = function(req, res) {
  Truck.find({}, function(err, truck) {
    if (err)
      res.send(err);
    res.json(truck);
  });
};




exports.create_a_truck = function(req, res) {
  var new_Truck = new Truck(req.body);
  new_Truck.save(function(err, truck) {
    if (err)
      res.send(err);
    res.json(truck);
  });
};


exports.read_a_truck = function(req, res) {
  Truck.findById(req.params.truckId, function(err, truck) {
    if (err)
      res.send(err);
    res.json(truck);
  });
};


exports.update_a_truck = function(req, res) {
  Truck.findOneAndUpdate({_id: req.params.truckId}, req.body, {new: true}, function(err, truck) {
    if (err)
      res.send(err);
    res.json(truck);
  });
};




exports.delete_a_truck = function(req, res) {


  Truck.remove({
    _id: req.params.truckId
  }, function(err, truck) {
    if (err)
      res.send(err);
    res.json({ message: 'trucks successfully deleted' });
  });
};

