const _ = require('lodash');

class PPR {

	constructor(data) {
		this.data = data;
	}

	getSuggestions(nodeId) {
		return this.personalizedPageRankGenerator(nodeId);
	};

	personalizedPageRankGenerator(nodeId) {
		// Set Probability of the starting node as 1
		// because we will start from that node
		var initProbabilityMap = {};

		initProbabilityMap[nodeId] = 1;

		// call helper to iterate thrice
		return this.pprHelper(nodeId, initProbabilityMap, 3);
	};

	pprHelper(nodeId, currentProbabilitiesMap, iterationCount) {
		// iterations done
		if (iterationCount === 0) {

			// get root nodes neighbors
			var currentNeighbors = this.getNeighbors(nodeId);

			// omit current neighbors and self node from calculated probabilities
			currentProbabilitiesMap = _.omit(currentProbabilitiesMap, currentNeighbors.concat(nodeId));

			// format data and sort by probability of final suggestions
			return _.chain(currentProbabilitiesMap)
				.map((val, key) => ({ name: key, score: val }))
				.orderBy('score', 'desc')
				.valueOf();

		} else {
			// Holds the updated set of probabilities, after this iteration
			var nextIterProbabilityMap = {};

			// set alpha
			var alpha = 0.33;

			// With probability alpha, we teleport to the start node again
			nextIterProbabilityMap[nodeId] = alpha;

			// extract nodes within current loop
			var parsedNodes = _.keys(currentProbabilitiesMap);

			// go to next degree nodes of each of the currently parsed nodes
			_.forEach(parsedNodes, (parsedId) => {

				// get current probability of each node
				var prob = currentProbabilitiesMap[parsedId];

				// get connected nodes
				var neighbors = this.getNeighbors(parsedId);


				// With probability 1 - alpha, we move to a connected node...
				// And at each node we distribute its current probability equally to
				// its neighbors

				var probToPropagate = (1 - alpha) * prob / neighbors.length;


				// spreading the probability equally to neighbors

				_.forEach(neighbors, (neighborId) => {
					nextIterProbabilityMap[neighborId] = (nextIterProbabilityMap[neighborId] || 0) + probToPropagate;
				});
			});

			console.log(`End of Iteration ${ 4 - iterationCount} : ${JSON.stringify(nextIterProbabilityMap)}`);
			// next iteration
			return this.pprHelper(nodeId, nextIterProbabilityMap, iterationCount - 1);
		}
	}

	getNeighbors(nodeId) {
		return _.get(this.data, [nodeId, 'neighbors'], []);
	}

}


module.exports = PPR;