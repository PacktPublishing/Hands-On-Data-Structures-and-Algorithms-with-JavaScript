var PriorityQueue = require('./priority-queue');

var Utils = (()=> {
	class Utils {

		constructor() {

		}

		getUniqueFailureQueue(from, to) {

			// use from and to here to determine if a failure queue already
			// exists or create a new one

			return new PriorityQueue();
		}

		sendMessage(message) {
			return new Promise(function(resolve, reject) {

				// randomize successes and failure of message being sent

				if(Math.random() < 0.1) {

					resolve(message)

				} else {

					reject(message);

				}

			});
		}

	}

	return Utils;
})();

module.exports = Utils;