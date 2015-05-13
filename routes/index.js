var express = require('express');
var article = require('./article');
var mongoose = require('mongoose');
var router = express.Router();
var ArticleModel = mongoose.model('Articles');

SUCCESS = 1;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/browse', function(req, res, next) {
  	article.findAllArticles(function(errCode, articles) { 
  		console.log(article.SUCCESS);
  		if(errCode === SUCCESS) {
	  		res.render('index', { 
	  			articles: articles
	  		});	
  		} else { 
  			return errHelper(res, errCode);
  		}
  });
});

router.post('/post', function(req, res, next) { 
	console.log("URL: ", req.body.url);
	ArticleModel.find({url: req.body.url}, function(err, article) { 
		if(article.length) { 
			console.log('article exists');
		} else { 
			ArticleModel.add(req.body.title, req.body.url, function(errCode) { 
				errHelper(res, errCode);
			});
		}
	});
});

function errHelper(res, errCode) { 
	if(errCode != 1) {
		return res.status(200).json({errCode: errCode});
	} else { 
		return res.status(200).json({errCode: 'SUCCESS'});
	}
}

module.exports = router;
