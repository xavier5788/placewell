var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'clients';
	locals.data = {
		locations: []
	}
	view.on('init', function(next){
		keystone.list("Location").model.find().sort('sortOrder').exec(function(err,locations){
			keystone.populateRelated(locations, 'clients', function(err){
				locals.data.locations = locations;
				next(err);
			})
		})
	})
	view.render('clients');
};
