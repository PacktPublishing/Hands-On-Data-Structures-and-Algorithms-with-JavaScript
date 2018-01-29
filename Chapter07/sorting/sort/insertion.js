class Insertion {

	sort(data) {
		// loop over all the entries
		for (var i = 1; i < data.length; ++i) {

			// take each entry
			var current = data[i];

			// previous entry
			var j = i - 1;

			// find location where selected sould be inseretd
			var index = this.binarySearch(data, current, 0, j);

			// shift all elements until new position
			while (j >= index) {
				// shift entries to right
				data[j + 1] = data[j];

				// decrement position for next iteration
				j = j - 1;
			}

			// push current data to new position
			data[j + 1] = current;
		}

		// return all sorted data
		return data;
	}

	binarySearch(data, current, lowPos, highPos) {
		// get middle position
		var midPos = Math.floor((lowPos + highPos) / 2);

		// if high < low return low position;
		// happens at the beginning of the data set
		if (highPos <= lowPos) {

			// invert condition to reverse sorting
			return (current.pages < data[lowPos].pages) ? (lowPos + 1): lowPos;
		}

		// if equal, give next available position
		if(current.pages === data[midPos].pages) {
			return midPos + 1;
		}

		// if current page count is less than mid position page count,
		// reevaluate for left half of selected range
		// invert condition and exchange return statements to reverse sorting
		if(current.pages > data[midPos].pages) {
			return this.binarySearch(data, current, lowPos, midPos - 1);
		}

		// evaluate for right half of selected range
		return this.binarySearch(data, current, midPos + 1, highPos);
	}
}

module.exports = Insertion;