const _ = require('lodash');

class BranchAndBound {

	constructor(list, maxCost) {
		// sort the costs in descending order for greedy calculation of upper bound
		var sortedList = _.orderBy(list,
							(option) => option.value/option.cost,
							'desc');

		// original list
		this.list = list;

		// max allowed cost
		this.maxCost = maxCost;

		// all costs
		this.costs = _.map(sortedList, 'cost');

		// all values
		this.values = _.map(sortedList, 'value');
	}

	calculate() {
		// size of the input data set
		var size = _.size(this.values);

		// create a queue for processing nodes
		var queue = [];

		// add dummy root node
		queue.push({
			depth: -1,
			value: 0,
			cost: 0,
			upperBound: 0
		});

		// initialize result
		var maxValue = 0;

		// initialize path to the result
		var finalIncludedItems = [];

		// while queue is not empty
		// i.e leaf node not found
		while(!_.isEmpty(queue)) {

			// initialize next node
			var nextNode = {};

			// get selected node from queue
			var currentNode = queue.shift();

			// if leaf node, no need to check for child nodes
			if (currentNode.depth !== size - 1) {

				// increment depth of the node
				nextNode.depth = currentNode.depth + 1;

				/*
				*
				*  We need to calculate the cost and value when the next item
				*  is included and when it is not
				*
				*
				*  First we check for when it is included
				*/

				// increment cost of the next node by adding current nodes cost to it
				// adding current nodes cost is indicator that it is included
				nextNode.cost =  currentNode.cost + this.costs[nextNode.depth];

				// increment value of the next node similar to cost
				nextNode.value =  currentNode.value + this.values[nextNode.depth];

				// if cost of next node is below the max and the value provided
				// by including it is more than the currently accrued value
				// i.e. bounds and constrains satisfied
				if (nextNode.cost <= this.maxCost && nextNode.value > maxValue) {

					// add node to results
					finalIncludedItems.push(nextNode.depth);

					// update maxValue accrued so far
					maxValue = nextNode.value;
				}

				// calculate the upper bound value that can be
				// generated from the new node
				nextNode.upperBound = this.upperBound(nextNode, size,
										this.maxCost, this.costs, this.values);

				// if the node is still below the upper bound
				if (nextNode.upperBound > maxValue) {

					// add to queue for further consideration
					queue.push(_.cloneDeep(nextNode));
				}

				/*
				 *  Then we check for when the node is not included
				 */

				// copy over cost and value from previous state
				nextNode.cost = currentNode.cost;
				nextNode.value = currentNode.value;

				// recalculate upper bound
				nextNode.upperBound = this.upperBound(nextNode, size,
										this.maxCost, this.costs, this.values);

				// if max value is still not exceeded,
				// add to queue for processing later
				if (nextNode.upperBound > maxValue) {

					// add to queue for further consideration
					queue.push(_.cloneDeep(nextNode));
				}
			}
		}

		// return results
		return { val: maxValue, items: _.pullAt(this.list, finalIncludedItems) };
	}

	upperBound(node, size, maxCost, costs, values) {
		// if nodes cost is over the max allowed cost
		if (node.cost > maxCost) {
			return 0;
		}

		// value of current node
		var valueBound = node.value;

		// increase depth
		var nextDepth = node.depth + 1;

		// init variable for cost calculation
		// starting from current node
		var totCost = node.cost;

		// traverse down the upcoming branch of the tree to see what
		// cost would be at the leaf node
		while ((nextDepth < size) && (totCost + costs[nextDepth] <= maxCost)) {
			totCost    += costs[nextDepth];
			valueBound += values[nextDepth];
			nextDepth++;
		}

		// allow fractional value calculations
		// for the last node
		if (nextDepth < size) {
			valueBound += (maxCost - totCost) * values[nextDepth] / costs[nextDepth];
		}

		// return final value at leaf node
		return valueBound;
	}
}

module.exports = BranchAndBound;