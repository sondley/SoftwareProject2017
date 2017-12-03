'use strict';


var mongoose = require('mongoose'),
  Client = mongoose.model('Clients');

exports.list_all_clients = function(req, res) {
  Client.find({}, function(err, client) {
    if (err)
      res.send(err);
    res.json(client);
  });
};




exports.create_a_client = function(req, res) {
  var new_client = new Client(req.body);
  new_client.save(function(err, client) {
    if (err)
      res.send(err);
    res.json(client);
  });
};


exports.read_a_client = function(req, res) {
  Client.findById(req.params.clientId, function(err, client) {
    if (err)
      res.send(err);
    res.json(client);
  });
};


exports.update_a_client = function(req, res) {
  Client.findOneAndUpdate({_id: req.params.clientId}, req.body, {new: true}, function(err, client) {
    if (err)
      res.send(err);
    res.json(client);
  });
};


/////////////////////////


exports.logear = function(req, res) {

 Client.findOne({email: req.params.email, phone: req.params.phone}, function(err, user){
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
///////////////////

/*
exports.logear = function(req, res) {
  Client.find({email:req.params.email}  function(err, client) {
    if (err)
    {
      res.status(400).send(err);
    }
    else
    {
      Client.find({phone:req.params.phone}, function(err, client) {
        if (err)
        {
          //res.status(400).send(err);
          res.json(false);
        }
        else
        {
          res.json(true);
        }
       // res.json(client);
      });
      
    }
   // res.json(client);
  });
};*/


exports.delete_a_client = function(req, res) {


  Client.remove({
    _id: req.params.clientId
  }, function(err, client) {
    if (err)
      res.send(err);
    res.json({ message: 'Clients successfully deleted' });
  });
};


/*
exports.logon = function(req, res) {
  Client.find(req.params.mail, function(err, client) {
    if (err)
    {
      res.send(err);
    }
    else
    {
       Client.find(req.params.password, function(err, client) {
        if (err)
        {
          res.send(err);
        }
        else
        {
          res.json(client);
        }

            }
       
    }
   
  });
};*/
