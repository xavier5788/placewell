const keystone = require('keystone');
const Types = keystone.Field.Types;

const Job = new keystone.List('Job', {
	autokey: { path: 'key', from: 'name', unique: true },
})
Job.add({
	name: { type: String, required: true },
	category: { type: Types.Relationship, ref: 'JobCategory' }
})
Job.register();
