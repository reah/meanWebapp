var express = require('express');
var article = require('./article');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/post', function(req, res, next) { 
	console.log('HERE');
	console.log("URL: ", req.body.url);
	article.add("UNKNOWN TITLE", req.body.url, function(errCode) { 
		if(errCode != 1) {
			return res.status(200).json({errCode: errCode});
		} else { 
			return res.status(200).json({errCode: 'SUCCESS'});
		}
	});
});

module.exports = router;
