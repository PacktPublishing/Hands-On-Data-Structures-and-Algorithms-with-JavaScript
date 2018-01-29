var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// suggestion endpoints
var suggestions = require('./routes/suggestions');

// middleware to parse the body of input requests
app.use(bodyParser.json());

// route middleware
app.use('/suggestions', suggestions);

// start server
app.listen(3000, function () {
	console.log('Application listening on port 3000!');
});