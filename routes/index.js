var express = require('express');
var router = express.Router();
var monk = require('monk');

//var db = monk('mongodb://admin:password@ds054128.mlab.com:54128/colossus-secrets');

var db = monk('mongodb://admin:password@ds064188.mlab.com:64188/k00203819-secrets');

/* GET home page with either / or index. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/index', function(req, res, next) {
  res.render('index');
});

router.get('/putout', function(req, res, next) {
  res.redirect('index');
});


/* GET bad login page if login is not proper */
router.get('/badLogin', function(req,res,next){
   res.render('badLogin', {title: 'badLogin'});
});

/* Secrets redirect if user tries to visit Secrets without logging in */
router.get('/usersSecrets', function(req, res, next) {
  if (log = 0){
    res.redirect('/index');
  } else {
      res.render('/usersSecrets')
  }
});


// Post request for index if password and username are submitted.
router.post('/index', function(req, res) {
    
    if (req.body.userName == "Cole" && req.body.passWord == "password") {
        
        var collection = db.get('secrets');
        collection.find({},{},function(e,docs){
            res.render('userssecrets', {
                "secrets" : docs
            });
        });

    }else {
      res.redirect('/badLogin');
    }
});

// Post request for badLogin page if password and username are submitted
router.post('/badLogin', function(req, res, next) {
    
    if (req.body.userName == "Cole" && req.body.passWord == "password") {
        var collection = db.get('secrets');
        collection.find({},{},function(e,docs){
            res.render('userssecrets', {
                "secrets" : docs
            });
        });
    }else {
        res.redirect('/badLogin');
    }
});


//Post for logout button on secrets page.
router.post('/logout', function(req, res, next) {
    res.render('index');
});

//ADDING SECRETS FUNCTION
router.post('/addsecret', function(req,res) {
    
    //Database variable
    
    //Pulls form variables
    var secret = req.body.newsecret;
    
    //Set Collection in which information will be stored to
    var collection = db.get('secrets');
    
    //Submit information to DB
    collection.insert({
        "userSecret": secret,
    }, function (err, doc) {
        if(err){
            //If it fails to add to the database then it will return the error
            res.send("There was a problem adding your information to the database");
        } else{
            //Forward to success page
            res.redirect("/usersSecrets");
        }
    });
});

//REMOVING SECRET

//REMOVE ALL
router.post('/removeAll', function (req, res) {
    var collection = db.get('secrets');
    
    collection.remove({}, function(err, doc) {
        if(err){
            res.send("GET MORE FIRE!");
        } else{
            res.render("putout")
        }
    });
})

module.exports = router;