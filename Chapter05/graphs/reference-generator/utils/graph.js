var _ = require('lodash');

class Graph {

	constructor(users) {
		// initialize edges
		this.edges = {};

		// save users for later access
		this.users = users;

		// add users and edges of each
		_.forEach(users, (user) => {
			this.edges[user.id] = user.friends;
		});
	}


	shortestPath(sourceUser, targetCompany) {

		console.log('starting the shortest path determination');

		// final shortestPath
		var shortestPath;

		// for iterating along the breadth
		var tail = 0;

		// queue of users being visited
		var queue = [ sourceUser ];

		console.log(`added ${sourceUser.id} to the queue`);

		// mark visited users
		var visitedNodes = [];

		// previous path to backtrack steps when shortestPath is found
		var prevPath = {};
		
		// request is same as response
		if (_.isEqual(sourceUser.company, targetCompany)) {
			return;
		}

		// mark source user as visited so
		// next time we skip the processing
		visitedNodes.push(sourceUser.id);

		console.log(`marked ${sourceUser.id} as visited`);

		// loop queue until match is found
		// OR until the end of queue i.e no match
		while (!shortestPath && tail < queue.length) {

			// take user breadth first
			var user = queue[tail];

			console.log(`    shortest path not found, moving on to next node in queue: ${user.id}`);

			// take nodes forming edges with user
			var friendsIds = this.edges[user.id];

			console.log(`    extracting neighbor nodes of node ${user.id} (${friendsIds})`);

			// loop over each node
			_.forEach(friendsIds, (friendId) => {

				// result found in previous iteration, so we can stop
				if (shortestPath) return;

				console.log(`        accessing neighbor ${friendId}`);

				// get all details of node
				var friend = _.find(this.users, ['id', friendId]);

				// if visited already,
				// nothing to recheck so return
				if (_.includes(visitedNodes, friendId)) {
					console.log(`        neighbor ${friendId} already visited, return control to top`);

					return;
				}

				// mark as visited
				visitedNodes.push(friendId);

				console.log(`        mark ${friendId} as visited`);

				// if company matched
				if (_.isEqual(friend.company, targetCompany)) {

					// create result path with the matched node
					var path = [ friend ];

					console.log(`        result found at ${friendId}, add it to result path ([${_.map(path, 'id')}])`);

					console.log(`        backtracking steps to ${sourceUser.id}`);

					// keep backtracking until source user and add to path
					while (user.id !== sourceUser.id) {

						console.log(`            we got to ${friend.id} from ${user.id}`);
						// add user to shortest path
						path.unshift(user);

						console.log(`            update path accodingly: ([${_.map(path, 'id')}])`);

						// prepare for next iteration
						user = prevPath[user.id];
					}

					console.log(`        add source user ${user.id} to result`);

					// add source user to the path
					path.unshift(user);

					// format and return shortestPath

					shortestPath = _.map(path, 'name').join(' -> ');

					console.log(`        form result [${_.map(path, 'id')}]`);
				}

				// break loop if shortestPath found
				if (shortestPath) {
					console.log(`        return result`);

					return;
				}

				// no match found at current user,
				// add it to previous path to help backtracking later
				prevPath[friend.id] = user;

				console.log(`        result not found, mark our path from ${user.id} to ${friend.id}`);

				// add to queue in the order of visit
				// i.e. breadth wise for next iteration
				queue.push(friend);

				console.log(`        result not found, add ${friend.id} to queue for next iteration`);
				console.log(`        current queue content : ${_.map(queue, 'id')}`);
			});

			// increment counter
			tail++;

			console.log(`    increment tail to ${tail}`);
		}


		console.log(`return result ${shortestPath}`);

		return shortestPath ||
				`No path between ${sourceUser.name} & ${targetCompany}`;
	}

}


module.exports = Graph;