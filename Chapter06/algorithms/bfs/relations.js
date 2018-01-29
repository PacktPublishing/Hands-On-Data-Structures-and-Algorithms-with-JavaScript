var _ = require('lodash');
var BFS = require('./bfs');
var familyNodes = require('./family.json');

// transform familyNodes into shorter format for simplified BFS
var transformedFamilyNodes = _.transform(familyNodes, (reduced, currentNode) => {

		reduced[currentNode.name] = _.map(currentNode.relations, 'name');

		return reduced;
}, {});

var relationship = new BFS(familyNodes).search(transformedFamilyNodes, 'C', 'G');

console.log(relationship);

// logs : C's Father's Sister's Son is G