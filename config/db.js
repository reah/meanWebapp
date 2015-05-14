var mongoose = require('mongoose')
mongoose.connect(process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||'mongodb://127.0.0.1:27017/webapp', function (err, db) {
  if(!err) { 
  	console.log('mongodb connected');
  }
});

module.exports = mongoose;