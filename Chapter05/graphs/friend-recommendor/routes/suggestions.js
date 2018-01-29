const express = require('express');
const router = express.Router();
const _ = require('lodash');
const PPR = require('../utils/ppr');

// sample set of users with friends extracted from some grapgh db
const users = {
	A: { neighbors: [ 'B', 'D' ] },
	B: { neighbors: [ 'A', 'C', 'E' ] },
	C: { neighbors: [ 'B', 'D', 'E' ] },
	D: { neighbors: [ 'A', 'C' ] },
	E: { neighbors: [ 'B', 'C' ] }
};

// middleware 
router.use(function(req) {
	// intercept, modify and then continue to next step
	req.next();
});

// route
router.route('/:userId')
	.get(function(req, res) {
		var suggestions;

		// take user Id
		const userId = req.params.userId;

		// generate suggestions
		suggestions = new PPR(users).getSuggestions(userId);

		// return suggestions
		res.send(suggestions);
	});

module.exports = router;