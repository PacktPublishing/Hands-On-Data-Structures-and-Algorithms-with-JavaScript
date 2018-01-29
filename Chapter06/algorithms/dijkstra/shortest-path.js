var Dijkstra = require('./dijkstra');

const graph = {
	'SF': { 'SB': 326, 'MT': 118, 'SJ': 49 },
	'SJ': { 'MT': 72, 'FR': 151, 'BK': 241 },
	'MT': { 'SB': 235, 'LA': 320 },
	'SB': { 'LA': 95 },
	'LA': { 'SD': 120 },
	'SD': { 'PX': 355 },
	'FR': { 'LV': 391 },
	'BK': { 'LA': 112, 'SD': 232, 'PX': 483, 'LV': 286 },
	'LV': { 'PX': 297 },
	'PX': {}
};

console.log(new Dijkstra().solve(graph, 'SF', 'PX'));