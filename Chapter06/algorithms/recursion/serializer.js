var fs = require('fs');
var Recursion = require('./recursion');

// set up data
const tree = {
	root: ['A'],
	A: ['B', 'C', 'D'],
	B: ['E', 'F'],
	D: ['G', 'H', 'I', 'J'],
	F: ['K']
};

// initialize
var serializer = new Recursion(tree);

// serialize
var serializedData = serializer.serialize(tree.root);

console.log(serializedData);