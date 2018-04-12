var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var data = {
		breakdown: {
			series: [],
			labels: []
		},
		totals: {
			series: [],
			labels: []
		},
	};

	keystone.list('JobStat').model.find().populate('job').sort('year').exec()
	.then(function(stats){
			if (stats == null || stats.length == 0) {
				return res.json({
					success: false
				})
			}
			const max = Math.max(...stats.map(stat=>stat.year));
			const breakdown = stats.filter(stat=>stat.year == max).forEach(function(stat){
				data.breakdown.series.push(stat.population);
				data.breakdown.labels.push(stat.job.name)
			})
			const totals = stats.reduce((acc,stat,i)=>{
												acc[stat.year] = (acc[stat.year] || 0) + stat.population;
												return acc;
											},{})
			Object.keys(totals).sort().forEach(function(year){
				data.totals.series.push(totals[year]);
				data.totals.labels.push(year);
			})
			res.json({
				success: true,
				data
			});
	}, function(err){
		console.log(err);
		res.json({
			success: false
		})
	});


};
