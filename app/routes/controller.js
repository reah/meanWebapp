var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('../../config/auth');
var ArticleSchema = require('../models/article');
var UserSchema = require('../models/user');
var router = express.Router();

var CONSTANTS = { success: 1, failure: -1 };

router.get('/', function(req, res) {
	res.render('welcome');
});

router.get('/browse', function(req, res, next) {
  	ArticleSchema.findAllArticles(function(errCode, articles) { 
  		if(errCode === CONSTANTS.success) {
	  		res.render('browse', { 
	  			articles: articles
	  		});	
  		} else { 
  			errHelper(res, errCode);
  		}
  });
});

router.post('/post', function(req, res, next) { 
	console.log("URL: ", req.body.url);
	ArticleSchema.add(req.body.title, req.body.url, function(errCode, article) {
        if(errCode) { 
            errHelper(res, errCode);
        } else { 
            console.log('SAVED: ' + article.toString());
        }
	});
});

// =====================================
// 			FACEBOOK ROUTES 
// =====================================
// route for facebook authentication and login
passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback/"
  },
  function(accessToken, refreshToken, profile, done) {
    UserSchema.AddUnique(profile, accessToken, function(err, user) {
      if (err) { 
        return done(err); 
    }
      console.log('USER: ' + user);
      return done(user);
    });
  }
));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/browse',
                                      failureRedirect: '/login' }));

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function errHelper(res, errCode) { 
	if(errCode != 1) {
		return res.status(200).json({errCode: errCode});
	} else { 
		return res.status(200).json({errCode: 'SUCCESS'});
	}
}

module.exports = router;
