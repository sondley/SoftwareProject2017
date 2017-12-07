'use strict';

var mongoose = require('mongoose');
  var CustomerField = mongoose.model('customerfields');

exports.list_all_customerFields = function(req, res) {
  CustomerField.find({}, function(err, customerField) {
    if (err)
      res.send(err);
    res.json(customerField);
  });
};

exports.list_user_custom_fields = function(req, res) {
 CustomerField.find({userId: req.params.userId}, function(err, user){
        if(err) {
            console.log(err);
        }
        else if(user){
            //res.redirect('/MainPage');
            res.json(user);

            console.log('!!!!!!!Nice!!!!!!!!!!!!!!!!!!!!!!');
        }
        else {
          res.json(false);
            console.log('------------------Invalid');
        }
    });

};




exports.create_a_customerField = function(req, res) {
  var new_customerField = new CustomerField(req.body);
  new_customerField.save(function(err, customerField) {
    if (err)
      res.send(err);
    res.json(customerField);
  });
};


exports.read_a_customerField = function(req, res) {
  CustomerField.findById(req.params.customerFieldId, function(err, customerField) {
    if (err)
      res.send(err);
    res.json(customerField);
  });
};


exports.update_a_customerField = function(req, res) {
  CustomerField.findOneAndUpdate({_id: req.params.customerFieldId}, req.body, {new: true}, function(err, customerField) {
    if (err)
      res.send(err);
    res.json(customerField);
  });
};


exports.delete_a_customerField = function(req, res) {


  CustomerField.remove({
    _id: req.params.customerFieldId
  }, function(err, customerField) {
    if (err)
      res.send(err);
    res.json({ message: 'customerField successfully deleted' });
  });
};



