var _ = require('lodash');

class BFS {

	constructor(familyNodes) {
		this.familyNodes = familyNodes;
	}

	search (graph, startNode, targetNode) {
		// initialize the path to traverse
		var travelledPath = [];

		// mark the nodes that need to be visited breadthwise
		var nodesToVisit = [];

		// mark all visited nodes
		var visitedNodes = {};

		// current node being visited
		var currentNode;

		// add start node to the to be visited path
		nodesToVisit.push(startNode);

		// mark starting node as visited node
		visitedNodes[startNode] = true;

		// while there are more nodes to go
		while (nodesToVisit.length) {

			// get the first one in the list to visit
			currentNode = nodesToVisit.shift();

			// if it is the target
			if (_.isEqual(currentNode, targetNode)) {

				// add to result, backtrack steps based on path taken
				var result = [targetNode];

				// while target is not source
				while (!_.isEqual(targetNode, startNode)) {

					// extract how we got to this node
					targetNode = travelledPath[targetNode];

					// add it to result
					result.push(targetNode);
				}

				// extract the relationships between the edges and retrun value
				return this.getRelationBetweenNodes(result.reverse());
			}

			// if result not found, set the next node to visit by traversing
			// breadth first
			_.forOwn(graph, (connections, name) => {

				// if not current node, is connected to current node
				// and not already visited
				if (!_.isEqual(name, currentNode)
					&& _.includes(graph[name], currentNode)
					&& !visitedNodes[name]) {

					// we will be visiting the new node from current node
					travelledPath[name] = currentNode;

					// set the visited flag
					visitedNodes[name] = true;

					// push to nodes to visit
					nodesToVisit.push(name);
				}
			});
		}

		// nothing found
		return null;
	}

	getRelationBetweenNodes(relationship) {
		// extract start and end from result
		var start = relationship.shift();
		var end = relationship.pop();

		// initialize loop variables
		var relation = '';
		var current = start;
		var next;
		var relationWithNext;

		// while end not found
		while (current != end) {
			// extract the current node and its relationships
			current = _.find(this.familyNodes, { name: current });

			// extract the next node, if nothing then set to end node
			next = relationship.shift() || end;

			// extract relationship between the current and the next node
			relationWithNext = _.find(current.relations, {name : next });

			// add it to the relation with proper grammar
			relation += `${relationWithNext.relation}${next === end ? '' : '\'s'} `;

			// set next to current for next iteration
			current = next;
		}

		// return result
		return `${start}'s ${relation}is ${end}`;
	}
}

module.exports = BFS;
