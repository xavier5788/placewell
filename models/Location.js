const keystone = require('keystone');

const Location = new keystone.List('Location', {
	autokey: { from: 'name', path: 'key', unique: true },
	sortable: true,
});
Location.add({
	name: { type: String, required: true}
})
Location.relationship({ ref: 'Client', path: 'clients', refPath: 'location' });
Location.register();
