'use strict';

var mongoose = require('mongoose'),
  CustomerField = mongoose.model('customerfields');

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


