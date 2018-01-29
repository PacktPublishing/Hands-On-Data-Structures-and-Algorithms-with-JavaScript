var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// register endpoints
var references = require('./routes/references');

// middleware to parse the body of input requests
app.use(bodyParser.json());

// route middleware
app.use('/references', references);

// start server
app.listen(3000, function () {
	console.log('Application listening on port 3000!');
});