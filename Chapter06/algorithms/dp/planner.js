var Planner = require('./dp');

let expenses = [
	{
		type: 'rent',
		cost: 5
	},
	{
		type: 'food',
		cost: 3
	},
	{
		type: 'entertainment',
		cost: 2
	},
	{
		type: 'car and gas',
		cost: 2
	},
	{
		type: 'ski-trip',
		cost: 5
	}
];
let total = 10;

var options = new Planner(expenses.length, total).analyze(expenses, total);

console.log(options);