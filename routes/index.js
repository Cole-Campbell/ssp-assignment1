var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'homepage' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'homepage' });
});

/* GET home page. */
router.get('/secrets', function(req, res, next) {
  res.redirect('/index');
});

/* GET login page */
router.get('/badLogin', function(req,res,next){
   res.render('badLogin', {title: 'badLogin'}); 
});

/*  */

// If we get a POST request for /name
router.post('/index', function(req, res, next) {
  // SELECT password from DB where username='req.body.yourName'
    
  if (req.body.userName == "Cole" && req.body.passWord == "password") {
    res.render('secrets', {name: req.body.userName});
  }
  else {
      res.redirect('/badLogin');
  }
});

router.post('/badLogin', function(req, res, next) {
  // SELECT password from DB where username='req.body.yourName'
    
  if (req.body.userName == "Cole" && req.body.passWord == "password") {
    res.redirect('secrets', {name: req.body.userName});
  }
  else {
      res.redirect('/badLogin');
  }
});

router.post('/logout', function(req, res, next) {
    res.render('index');
});
module.exports = router;
