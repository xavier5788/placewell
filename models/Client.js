const keystone = require('keystone');
const Types = keystone.Field.Types;

const Client = new keystone.List('Client', {
	autokey: { from: 'name', path: 'key', unique: true }
})

Client.add({
	name: { type: String, required: true },
	location: { type: Types.Relationship, ref: 'Location', index: true, required: true, initial: true },
	image: { type: Types.CloudinaryImage }
})

Client.register();
