var express = require('express');
var router = express.Router();
let User = require('../model/user');


router.get('/', function(req, res, next) {
  User.find({}, function(err, users){
    if(err){
      console.log(err);
    } else{
      res.send(users);
    }
  });
});

router.get('/:user_id', function(req, res, next) {
  console.log('req.params.user_id', req.params.user_id);
  
  User.find({ user_id: req.params.user_id }, function(err, user){
    if(err){
      console.log(err);
    } else{
      res.send(user);
    }
  });
});

router.post('/', function(req, res, next) {
  const user = new User({
    user_id: req.body.user_id,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    expense: req.body.expense,
    requision_date: req.body.requision_date,
    requision_type: req.body.requision_type,
    requision_for: req.body.requision_for
  });

  user.save(function(err) {
    if(err) {
      console.log(err)
    } else {
      res.send(res.statusCode);
    }
  });
});

router.delete('/:user_id', function(req, res, next) {
  User.deleteOne({ user_id: req.params.user_id }, function (err) {
    if(err) {
      console.log(err);
    } else {
      res.send(res.statusCode);
    }
  });
});

router.patch('/:user_id', function(req, res, next) {
  User.findOneAndUpdate({ user_id: req.params.user_id }, req.body, {upsert: true}, function(err, doc) {
    if(err) {
      console.log(err);
    } else {
      res.send(res.statusCode);
    }
  });
});

module.exports = router;
