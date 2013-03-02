var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.dev.dbUrl);

var userSchema = new mongoose.Schema({
	fbId: String,
	name: String,
	email: {type: String, lowercase: true}
});

module.exports = mongoose.model('User', userSchema);