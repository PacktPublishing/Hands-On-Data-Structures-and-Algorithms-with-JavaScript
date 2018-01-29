var CircularDequeue = (()=> {

	// pseudo realistic 2^x value
	const _size = 1024;
	let _length = 0;
	let _front = 0;
	let _data = [];


	class CircularDequeue {
		constructor() {

		}

		push (item) {
			// get the length of the array
			var length = _length;

			// calculate the end
			var i = (_front + length) & (_size - 1);

			// assign value to the current end of the data
			_data[i] = item;

			// increment length for quick look up
			_length = length + 1;

			// return new length
			return _length;
		}

		pop () {
			// get the length of the array
			var length = _length;

			// calculate the end
			var i = (_front + length - 1) & (_size - 1);

			// copy the value to return
			var ret = _data[i];

			// remove the value from data
			_data[i] = undefined;

			// reduce length for look up
			_length = length - 1;

			// return value
			return ret;
		}

		shift () {
			// get the current front of queue
			var front = _front;

			// capture return value
			var ret = _data[front];

			// reset value in the data
			_data[front] = undefined;

			// calculate the new front of the queue
			_front = (front + 1) & (_size - 1);

			// reduce the size
			_length = _length - 1;

			// return the value
			return ret;

		}

		unshift (item) {
			// get the size
			var size = _size;

			// calculate the new front
			var i = (((( _front - 1 ) & ( size - 1) ) ^ size ) - size );

			// add the item
			_data[i] = item;

			// increment the length
			_length = _length + 1;

			// update the new front
			_front = i;

			// return the acknowldgement of the addition of the new item
			return _length;
		}
	}

	return CircularDequeue;
})();

module.exports = CircularDequeue;