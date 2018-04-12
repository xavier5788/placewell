const keystone = require('keystone');
const Types = keystone.Field.Types;

const JobStat = new keystone.List('JobStat', {
	autokey: { from: 'job', path: 'key', unique: true  },
	defaultSort: 'year',
	defaultColumns: 'job, population, year'
});
JobStat.add({
	job: { type: Types.Relationship, ref:"JobCategory", index: true, required: true, initial: true },
	population: { type: Number, default: 0 },
	year: { type: Number, required: true, default: function() { return (new Date()).getFullYear(); } }
})

JobStat.register();
