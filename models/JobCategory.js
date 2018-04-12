const keystone = require('keystone');
const Types = keystone.Field.Types;

const JobCategory = new keystone.List('JobCategory', {
	autokey: { path: 'key', from: 'name', unique: true },
	sortable: true,
})

JobCategory.add({
	name: { type: String, required: true },
	image: { type: Types.CloudinaryImage },
	description: { type: Types.Textarea },
})
JobCategory.relationship({ ref: 'Job', path: 'jobs', refPath: 'category' });
JobCategory.register();
