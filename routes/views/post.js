var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post,
	};
	locals.data = {
		posts: [],
		categories: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var postQuery = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post,
		}).populate('author categories');

		Promise.all([
				keystone.list('PostCategory').model.find().sort('name').exec(),
				postQuery.exec()
			]).then(function([categories,post]){
				locals.data.post = post;
				locals.data.categories = categories;
				next();
			},next)

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});

	});

	// Render the view
	view.render('post');
};
