
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Express' });
};

exports.loggedin = function(req, res){
	res.render('loggedin', {user: req.user.name});
}