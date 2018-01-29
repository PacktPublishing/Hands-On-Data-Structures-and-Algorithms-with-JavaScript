var _ = require('lodash');

class Dijkstra {
	solve (graph, start, end) {

		// track costs of each node
		const costs = graph[start];

		// set end to infinite on 1st pass
		costs[end] = Infinity;

		// remember path from
		// which each node was visited
		const paths = {};

		// add path for the start nodes neighbors
		_.forEach(graph[start], (dist, city) => {
			// e.g. city SJ was visited from city SF
			paths[city] = start;
		});

		// track nodes that have already been visited nodes
		const visitedNodes = [];

		// get current nodes cheapest neighbor
		let currentCheapestNode = this.getNextLowestCostUnvisitedNode(costs, visitedNodes);

		// while node exists
		while (currentCheapestNode) {

			// get cost of reaching current cheapest node
			let costToReachCurrentNode = costs[currentCheapestNode];

			// access neighbors of current cheapest node
			let neighbors = graph[currentCheapestNode];

			// loop over neighbors
			_.forEach(neighbors, (dist, neighbor) => {

				// generate new cost to reach each neighbor
				let newCost = costToReachCurrentNode + dist;

				// if not already added
				// or if it is lowest cost amongst the neighbors
				if (!costs[neighbor] || costs[neighbor] > newCost) {

					// add cost to list of costs
					costs[neighbor] = newCost;

					// add to paths
					paths[neighbor] = currentCheapestNode;

				}

			});

			// mark as visited
			visitedNodes.push(currentCheapestNode);

			// get cheapest node for next node
			currentCheapestNode = this.getNextLowestCostUnvisitedNode(costs, visitedNodes);
		}

		// generate response
		let finalPath = [];

		// recursively go to the start
		let previousNode = paths[end];

		while (previousNode) {
			finalPath.unshift(previousNode);
			previousNode = paths[previousNode];
		}

		// add end node at the end
		finalPath.push(end);

		// return response
		return {
			distance: costs[end],
			path: finalPath
		};
	}

	getNextLowestCostUnvisitedNode(costs, visitedNodes) {
		//extract the costs of all non visited nodes
		costs = _.omit(costs, visitedNodes);

		// return the node with minimum cost
		return _.minBy(_.keys(costs), (node) => {
			return costs[node];
		});
	}

}

module.exports = Dijkstra;
