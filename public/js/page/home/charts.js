Promise.all([
	load.css("https://cdnjs.cloudflare.com/ajax/libs/chartist/0.11.0/chartist.min.css"),
	load.js("https://cdnjs.cloudflare.com/ajax/libs/chartist/0.11.0/chartist.js")
]).then(function(){
	return load.js("https://cdn.bootcss.com/chartist-plugin-legend/0.6.1/chartist-plugin-legend.js")
}).then(function(){
	return fetch('/json/chart');
}).then(function(response){
	return response.json();
}).then(function(response){
	if (response.success == false) return;
	var data = response.data;
	const workerChart = new Chartist.Pie('#worker-breakdown-chart-container', data.breakdown, {
			donut: true,
			showLabel: false,
			plugins: [
				Chartist.plugins.legend()
			]
	}).on('draw', function(data) {
		if(data.type === 'slice') {
			var pathLength = data.element._node.getTotalLength();
			data.element.attr({
				'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
			});
			var animationDefinition = {
				'stroke-dashoffset': {
					id: 'anim' + data.index,
					dur: 200,
					from: -pathLength + 'px',
					to:  '0px',
					easing: Chartist.Svg.Easing.easeOutQuint,
					fill: 'freeze'
				}
			};
			if(data.index !== 0) {
				animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
			}
			data.element.attr({
				'stroke-dashoffset': -pathLength + 'px'
			});
			data.element.animate(animationDefinition, false);
		}
	});
	const totalChart = new Chartist.Bar("#worker-total-chart-container", {
		series: [data.totals.series],
		labels: data.totals.labels
	}).on("draw", function(bars) {
		bars.element.animate({
			y2: {
				begin: 0,
				dur: 500,
				from: bars.y1,
				to: bars.y2
			}
		})
	});

	jzmn(".charts-container").removeClass("closed");
})
