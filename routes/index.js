var models = require('../models'),
User = models.User;


exports.homepage = function(req, res){
	var user = req.session.user
	if (user) {
		req.facebook.api('/me?fields=picture.type(large),photos.type(large).limit(50).fields(id,picture)', function(err, data) {
			// console.log(data);
			// console.log(data.photos.data);
			res.render('index', { title: 'Welcome to your homepage!',  picURL: data.picture.data.url, photos: data.photos.data, userColor: user.colorCode });
		});
	}
	else {
		res.render('index', { title: 'Please Login', userColor: '' });
	}
};

exports.login =   function (req, res){
	req.facebook.api('/me', function(err, facebookUser) {
		if (err){
			return console.log("error", err);
		}
		User.findOne({facebookId:facebookUser.id}).exec(function(err, user){
			if (!user){
				var dbUser = new User ({facebookId:facebookUser.id, colorCode:'#FFFFFF'});
				dbUser.save(function(err){
					if (err){
						return console.log("error", err);
					}
				});
			}
			req.session.user =  user || dbUser;
			res.redirect('/');
		});
  });
};

exports.logout =   function (req, res){
	req.user = null;
	req.session.destroy();
	res.redirect('/');
};

exports.color = function (req, res){
	console.log(req.body);
	User.findOne({facebookId:req.session.user.facebookId}).exec(function(err, user){
		if (err){
			return console.log("error", err);
		}
		user.colorCode = req.body.color;
		user.save(function(err){
			if (err){
				return console.log("error",err);
			}
		});
		res.redirect('/');
	});
};

exports.comment = function (req, res){
	console.log(req.body);
	req.facebook.api('/'+req.body.photoID+'/comments', 'post', {message: req.body.message}, function(err, data) {
		if (err){
			return console.log("error", err);
		}
	});
};