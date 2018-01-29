"use strict";
var Queue = (() => {
	const qKey = {};
	const items = new WeakMap();

	class Queue {

		constructor() {
			items.set(qKey, []);
		}

		add(element) {
			let queue = items.get(qKey);
			queue.push(element);
		}

		remove() {
			let queue = items.get(qKey);
			return queue.shift();
		}

		peek() {
			let queue = items.get(qKey);
			return queue[queue.length - 1];
		}

		front() {
			let queue = items.get(qKey);
			return queue[0];
		}

		clear() {
			items.set(qKey, []);
		}

		size() {
			return items.get(qKey).length;
		}
	}

	return Queue;
})();

module.exports = Queue;