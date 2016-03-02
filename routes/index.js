//Declared Modules - If new added, add here
var express = require('express');
var router = express.Router();
var monk = require('monk');

//Declared MongoLab Database
var db = monk('mongodb://admin:password@ds064188.mlab.com:64188/k00203819-secrets');

/* GET home page with either / or /index. */
router.get('/' || '/index', function(req, res, next) {
  res.render('index');
});
router.get('/index', function(req, res, next) {
  res.render('index');
});

//Redirect if a user tries to go to Putout page without going through proper path
router.get('/putout', function(req, res, next) {
  res.redirect('index');
});

/* GET bad login page if login is not proper */
router.get('/badLogin', function(req,res,next){
   res.render('badLogin', {title: 'badLogin'});
});

//Post request for index if password and username are submitted.
router.post('/index', function(req, res) {
    //If statement for predetermined login information
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
    //If statement for predetermined login information
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
    
    //Pulls form variables to variable
    //Newsecret is the name of the secrets text box. Pulls info from that box
    var secret = req.body.newsecret;
    
    //Select Collection in which information will be stored to
    //Secrets is the name of the database
    var collection = db.get('secrets');
    
    //Submits information to DB
    collection.insert({
        //Declared the name of the variable on the database and declares that the secret
        //variable is the value
        "userSecret": secret,
    }, function (err, doc) {
        //If statement looking for an error if secrets cannot be passed
        if(err){
            //If it fails to add to the database then it will return the error
            res.send("There was a problem adding your information to the database");
        } else{
            //Forward back to secrets page to show user secrets and allow them to delete them
            var collection = db.get('secrets');
                collection.find({},{},function(e,docs){
                res.render('usersSecrets', {
                    "secrets" : docs
                });
            });
        }
    });
});

//REMOVING SECRET
router.post('/remove', function(req,res) {
    
    //ID Variable to hold the delete buttons ID which we will seek and delete
    var secretid = req.body.id;
    
    //Set Collection in which information will be stored to
    var collection = db.get('secrets');
    
    //Submit information to DB
    collection.remove({

        //Declared the name of the variable of the database in which we will look for and delete
        //if the "id" is equal to the variable secretid
        "id": secretid,
     
    }, function (err, doc) {
        if(err){
            //If it fails to add to the database then it will return the error
            res.send("There was a problem adding your information to the database");
        } else{
            //Forward to secrets page to show the user their secrets again
            var collection = db.get('secrets');
                collection.find({},{},function(e,docs){
                res.render('usersSecrets', {
                    "secrets" : docs
                });
            });
        }
    });
});

//REMOVE ALL
//Fail safe button to delete all secrets in case the user doesn't have time to delete one by one
router.post('/removeAll', function (req, res) {
    
    //Declares the collection secrets to variable for later use
    var collection = db.get('secrets');
    
    
    collection.remove({}, function(err, doc) {
        //Returns error if Secrets cannot be deleted
        if(err){
            res.send("GET MORE FIRE!");
        }
        //Renders the Putout page for the user
        else{
            res.render("putout")
        }
    });
})

module.exports = router;