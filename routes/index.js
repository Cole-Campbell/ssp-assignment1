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
    
  if (req.body.passWord == "password") {
    res.render('secrets');
  }
  else {
      res.redirect('/badLogin');
  }
});

router.post('/logout', function(req, res, next) {
    res.render('index');
});

router.post('/badLogin', function(req, res, next) {
  // SELECT password from DB where username='req.body.yourName'
    
  if (req.body.passWord == "password") {
    res.render('secrets');
  }
  else {
      res.redirect('/badLogin');
  }
});
module.exports = router;
