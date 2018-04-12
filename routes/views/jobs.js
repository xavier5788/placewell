var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'jobs';
	locals.data = {
		jobCategories: []
	}
	view.on('init',function(next){
		keystone.list("JobCategory").model.find().sort('sortOrder').exec(function(err,categories){
			keystone.populateRelated(categories, 'jobs', function(err){
				locals.data.jobCategories = categories;
				next(err);
			})
		})
	})
	view.render('jobs');
};
