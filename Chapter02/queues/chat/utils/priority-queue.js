"use strict";
var PriorityQueue = (() => {
	const pqKey = {};
	const items = new WeakMap();

	class PriorityQueue {

		constructor() {
			items.set(pqKey, []);
		}

		add(newEl) {
			let queue = items.get(pqKey);
			let newElPosition = queue.length;

			if(!queue.length) {
				queue.push(newEl);
				return;
			}

			for (let [i,v] of queue.entries()) {
				if(newEl.priority > v.priority) {
					newElPosition = i;
					break;
				}
			}

			queue.splice(newElPosition, 0, newEl);
		}

		remove() {
			let queue = items.get(pqKey);
			return queue.shift();
		}

		peek() {
			let queue = items.get(pqKey);
			return queue[queue.length - 1];
		}

		front() {
			let queue = items.get(pqKey);
			return queue[0];
		}

		clear() {
			items.set(pqKey, []);
		}

		size() {
			return items.get(pqKey).length;
		}
	}

	return PriorityQueue;
})();

module.exports = PriorityQueue;