const _ = require('lodash');

class MST {

	constructor(edges, vertices) {
		this.edges = _.sortBy(edges, 'weight');
		this.vertices = vertices;
	}


	getNodes () {
		let result = [];

		// subsets to track the parents and ranks
		var subsets = {};

		// split each vertex into its own subset
		// with each of them initially pointing to themselves
		_.each(this.vertices, (val)=> {
			subsets[val] = {
				parent: val,
				rank: 0
			};
		});

		// loop over each until the size of the results
		// is 1 less than the number of vertices
		while(!_.isEqual(_.size(result), _.size(this.vertices) - 1)) {

			// get next edge
			var selectedEdge = this.edges.shift();

			// find parent of start and end nodes of selected edge
			var x = this.find(subsets, selectedEdge.from);
			var y = this.find(subsets, selectedEdge.to);

			// if the parents nodes are not the same then
			// the nodes belong to different subsets and can be merged
			if (!_.isEqual(x, y)) {

				// add to result
				result.push(selectedEdge);

				// push is resultant tree as new nodes
				this.union(subsets, x, y);
			}
		}

		return result;
	}

	// find parent with path compression
	find(subsets, i) {
		let subset = subsets[i];

		// until the parent is not itself, keep updating the
		// parent of the current node
		if (subset.parent != i) {
			subset.parent = this.find(subsets, subset.parent);
		}

		return subset.parent;
	}

	// union by rank
	union(subsets, x, y) {
		// get the root nodes of each of the nodes
		let xRoot  = this.find(subsets, x);

		let yRoot  = this.find(subsets, y);

		// ranks equal so it doesnt matter which is the parent of which node
		if (_.isEqual(subsets[xRoot].rank, subsets[yRoot].rank)) {

			subsets[yRoot].parent = xRoot;

			subsets[xRoot].rank++;

		} else {
			// compare ranks and set parent of the subset
			if(subsets[xRoot].rank < subsets[yRoot].rank) {

				subsets[xRoot].parent = yRoot;

			} else {

				subsets[yRoot].parent = xRoot;

			}
		}
	}


}

module.exports = MST;