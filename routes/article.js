var mongoose = require('mongoose');
Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: String || { default: "UNKNOWN TITLE" },
	url: String || { default: "UNKNOWN URL" }
});

SUCCESS = 1;
ERROR = 500;

ArticleSchema.statics.add = function(title, url, callback) {
	var Article = mongoose.model('Articles');
	Article.create({title: title, url: url}, function (err, article) { 
		if(err) { 
			console.error("Error in saving creating article");
		} else { 
			return callback(SUCCESS);
		}
	});
}

ArticleSchema.statics.findAllArticles = function(callback) {
	var i = 0; 
	var Article = mongoose.model('Articles');
	Article.find({}, function(err, articles) { 
		if(err) {
			console.error(err);
			callback(ERROR);
		} else { 
			for(i; i < articles.length; i++) { 
				console.log(articles[i].url);
			}
			callback(SUCCESS, articles);
		}
	});
}

module.exports = mongoose.model('Articles', ArticleSchema);