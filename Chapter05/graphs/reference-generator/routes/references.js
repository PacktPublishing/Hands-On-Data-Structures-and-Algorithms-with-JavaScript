var express = require('express');
var router = express.Router();
var Graph = require('../utils/graph');
var _ = require('lodash');
var userGraph;

// sample set of users with friends
var users = [
	{
		id: 1,
		name: 'Adam',
		company: 'Facebook',
		friends: [2, 3, 4, 5, 7]
	},
	{
		id: 2,
		name: 'John',
		company: 'Google',
		friends: [1, 6, 8]
	},
	{
		id: 3,
		name: 'Bill',
		company: 'Twitter',
		friends: [1, 4, 5, 8]
	},
	{
		id: 4,
		name: 'Jose',
		company: 'Apple',
		friends: [1, 3, 6, 8]
	},
	{
		id: 5,
		name: 'Jack',
		company: 'Samsung',
		friends: [1, 3, 7]
	},
	{
		id: 6,
		name: 'Rita',
		company: 'Toyota',
		friends: [2, 4, 7, 8]
	},
	{
		id: 7,
		name: 'Smith',
		company: 'Matlab',
		friends: [1, 5, 6, 8]
	},
	{
		id: 8,
		name: 'Jane',
		company: 'Ford',
		friends: [2, 3, 4, 6, 7]
	}
];

// middleware to create the users graph
router.use(function(req) {
	// form graph
	userGraph = new Graph(users);

	// continue to next step
	req.next();
});

// create the route for generating reference path
// this can also be a get request with params based
// on developer preference
router.route('/')
	.post(function(req, res) {

		// take user Id
		const userId = req.body.userId;

		// target company name
		const companyName = req.body.companyName;

		// extract current user info
		const user = _.find(users, ['id', userId]);

		// get shortest path
		const path = userGraph.shortestPath(user, companyName);

		// return
		res.send(path);
	});

module.exports = router;