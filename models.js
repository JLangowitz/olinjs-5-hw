var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	facebookId: String,
	colorCode: String
});

var User = mongoose.model('User', UserSchema);
exports.User = User;
