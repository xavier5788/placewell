const keystone = require('keystone');
const Types = keystone.Field.Types;

const Story = new keystone.List('Story', {
	autokey: { path: 'key', from: 'quote', unique: true },
	sortable: true,
	defaultColumns: 'id|20%, active|10%, source|10%, quote|60%'
})

Story.add({
	source: { type: String, required: true, initial: true },
	quote: { type: Types.Textarea, required: true, initial: true  },
	active: { type: Types.Boolean, required: true, default: true }
})
Story.register();
