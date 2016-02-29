var express = require('express');
var fs = require('fs');
var obj;
var router = express.Router();

/* GET home page with either / or index. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'homepage' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'homepage' });
});


/* GET bad login page if login is not proper */
router.get('/badLogin', function(req,res,next){
   res.render('badLogin', {title: 'badLogin'}); 
});


/* Secrets redirect if user tries to visit Secrets without logging in */
router.get('/secrets', function(req, res, next) {
  res.redirect('/index');
});


// Post request for index if password and username are submitted.
router.post('/index', function(req, res, next) {
    
    if (req.body.userName == "Cole" && req.body.passWord == "password") {
        res.render('secrets', {name: req.body.userName});
    }else {
      res.redirect('/badLogin');
    }
    
    //Read secrets in
   fs.readFile('secrets.json', 'utf8', (err, data) => {
       if(err) throw err;
       console.log(data);
   });
});

// Post request for badLogin page if password and username are submitted
router.post('/badLogin', function(req, res, next) {
    
    if (req.body.userName == "Cole" && req.body.passWord == "password") {
        res.redirect('secrets', {name: req.body.userName});
    }else {
        res.redirect('/badLogin');
    }
});


//Post for logout button on secrets page.
router.post('/logout', function(req, res, next) {
    res.render('index');
});

module.exports = router;