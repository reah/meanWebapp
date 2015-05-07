var mongoose = require('mongoose');
Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: String || { default: "UNKNOWN TITLE" },
	url: String || { default: "UNKNOWN URL" }
});

var SUCCESS = 1;

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

module.exports = mongoose.model('Articles', ArticleSchema);