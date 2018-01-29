class Quick {

	simpleSort(data) {

		// if only one element exists
		// i.e. end of divide
		if(data.length < 2) {
			return data;
		}

		// first data point is the pivot
		const pivot = data[0];

		// initialize low and high values
		const low = [];
		const high = [];

		// compare against pivot and add to
		// low or high values
		for(var i = 1; i < data.length; i++) {

			// interchange condition to reverse sorting
			if(data[i].pages > pivot.pages) {
				low.push(data[i]);
			} else {
				high.push(data[i]);
			}
		}

		// recursively sort and concat the
		// low values, pivot and high values
		return this.simpleSort(low)
			.concat(pivot, this.simpleSort(high));
	}

	// sort class, default the values of high, low and sort
	sort(data, low = 0, high = data.length - 1, sort = 'hoare') {
		// get the pivot

		var pivot =  (sort === 'hoare') ? this.partitionHoare(data, low, high)
						: this.partitionLomuto(data, low, high);

		// sort values lesser than pivot position recursively
		if(low < pivot - 1) {
			this.sort(data, low, pivot - 1);
		}

		// sort values greater than pivot position recursively
		if(high > pivot) {
			this.sort(data, pivot, high);
		}

		// return sorted data
		return data;
	}

	// Hoare Partition Scheme
	partitionHoare(data, low, high) {
		// determine mid point
		var pivot = Math.floor((low + high) / 2 );

		// while both ends do not converge
		while(low <= high) {

			// increment low index until condition matches
			while(data[low].pages > data[pivot].pages) {
				low++;
			}

			// decrement high index until condition matches
			while(data[high] && (data[high].pages < data[pivot].pages)) {
				high--;
			}

			// if not converged, swap and decrement indices
			if (low <= high) {
				this.swap(data, low, high);
				low++;
				high--;
			}
		}

		// return the smaller value
		return low;
	}

	// Lomuto Partition Scheme
	partitionLomuto(data, low, high) {

		// Take pivot as the high value
		var pivot = high;

		// initialize loop pointer variable
		var i = low;

		// loop over all values except the last (pivot)
		for(var j = low; j < high - 1; j++) {

			// if value greater than pivot
			if (data[j].pages >= data[pivot].pages) {

				// swap data
				this.swap(data, i , j);

				// increment pointer
				i++;
			}
		}

		// final swap to place pivot at correct
		// position by swapping
		this.swap(data, i, j);

		// return pivot position
		return i;
	}

	// swap data at two indices
	swap(data, i, j) {
		var temp = data[i];
		data[i] = data[j];
		data[j] = temp;
	}

}


module.exports = Quick;