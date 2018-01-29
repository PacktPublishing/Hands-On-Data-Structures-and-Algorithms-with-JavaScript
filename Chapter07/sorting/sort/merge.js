class Merge {
	
	sort(data) {
		// when divided to single elements
		if(data.length === 1) {
			return data;
		}

		// get middle index
		const middle = Math.floor(data.length / 2);

		// left half
		const left = data.slice(0, middle);

		// right half
		const right = data.slice(middle);

		// sort and merge
		return this.merge(this.sort(left), this.sort(right));
	}
	
	merge(left, right) {
		// initialize result
		const result = [];

		// while data
		while(left.length && right.length) {

			// sort and add to result
			// change to invert sorting
			if(left[0].pages > right[0].pages) {
				result.push(left.shift());
			} else {
				result.push(right.shift());
			}
		}

		// concat remaining elements with result
		return result.concat(left, right);
	}
}


module.exports = Merge;