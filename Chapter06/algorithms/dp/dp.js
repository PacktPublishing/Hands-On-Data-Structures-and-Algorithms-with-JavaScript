var _ = require('lodash');

class Planner {

	constructor(rows, cols) {
		// create a 2d array of rows x cols
		// all with value false
		this.planner = _.range(rows).map(() => {
			return _.range(cols + 1).map(()=> false);
		});

		// holds the response
		this.outcomes = [];
	}

	generateOutcomes(expenses, i, sum, paths) {
		// reached the end and the sum is non zero
		if(i === 0 && sum !== 0 && this.planner[0][sum]) {
			paths.push(expenses[i]);
			this.outcomes.push(_.cloneDeep(paths));
			paths = [];
			return;
		}

		// reached the end and the sum is zero
		// i.e. reached the origin
		if(i === 0 && sum === 0) {
			this.outcomes.push(_.cloneDeep(paths));
			paths = [];
			return;
		}

		// if the sum can be generated
		// even without the current value
		if(this.planner[i - 1][sum]) {
			this.generateOutcomes(expenses, i - 1, sum, _.cloneDeep(paths));
		}

		// if the sum can be derived
		// only by including the the current value
		if(sum >= expenses[i].cost && this.planner[i - 1][sum - expenses[i].cost]) {
			paths.push(expenses[i]);
			this.generateOutcomes(expenses, i - 1, sum - expenses[i].cost, paths);
		}
	}

	analyze(expenses, sum) {
		// get size of expenses
		const size = _.size(expenses);

		// if sum 0, result can be done with 0 elements so
		// set col 0 of all rows as true
		_.times(size, (i)=> {
			this.planner[i] = this.planner[i] || [];
			this.planner[i][0] = true;
		});

		// for the first row, if the first cost in the expenses
		// is less than the requested total, set its column value
		// to true
		if(expenses[0].cost <= sum) {
			this.planner[0][expenses[0].cost] = true;
		}

		// start from row #2 and loop over all other rows
		for(let i = 1; i < size; i++) {

			// take each column
			_.times(sum + 1, (j) => {

				// if the expenses cost for the current row
				// is less than or equal to the sum assigned to the
				// current column
				if (expenses[i].cost <= j) {

					// copy value from above row in the same column if true
					// else look at the value offset by the current rows cost
					this.planner[i][j] =  this.planner[i - 1][j]
										|| this.planner[i - 1][j - expenses[i].cost];
				} else {
					// copy value from above row in the same column
					this.planner[i][j] =  this.planner[i - 1][j];
				}
			});
		}

		// no results found
		if (!this.planner[size - 1][sum]) {
			return [];
		}

		// generate the outcomes from the results found
		this.generateOutcomes(expenses, size - 1, sum, []);

		return this.outcomes;
	}

}

module.exports = Planner;