const _ = require('lodash');
const BnB = require('./bnb');

const list = [
	{
		name: 'vegetables',
		value: 12,
		cost: 4
	},
	{
		name: 'candy',
		value: 1,
		cost: 1
	},
	{
		name: 'magazines',
		value: 4,
		cost: 2
	},
	{
		name: 'dvd',
		value: 6,
		cost: 2
	},
	{
		name: 'earphones',
		value: 6,
		cost: 3
	},
	{
		name: 'shoes',
		value: 4,
		cost: 2
	},
	{
		name: 'supplies',
		value: 9,
		cost: 3
	}
];

const budget = 10;

var result = new BnB(list, budget).calculate();

console.log(result);