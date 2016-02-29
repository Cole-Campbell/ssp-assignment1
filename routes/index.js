var express = require('express');
var router = express.Router();
var monk = require('monk');

var db = monk('mongodb://admin:password@ds054128.mlab.com:54128/colossus-secrets');
/* Secrets URL
var db = monk('mongodb://admin:password@ds064188.mlab.com:64188/k00203819-secrets');
*/

/* GET home page with either / or index. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/index', function(req, res, next) {
  res.render('index');
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
        var collection = db.get('usercollection');
            collection.find({},{},function(e,docs){
                res.render('/secrets', {
                    "userlist" : docs
                });
            });
    }else {
      res.redirect('/badLogin');
    }
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