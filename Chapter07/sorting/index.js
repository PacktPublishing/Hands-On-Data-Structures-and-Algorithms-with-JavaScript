var express = require('express');
var app = express();
var data = require('./books.json');
var Insertion = require('./sort/insertion');
var Merge = require('./sort/merge');
var Quick = require('./sort/quick');

app.get('/', function (req, res) {
	res.status(200).send('OK!')
});


app.get('/insertion', function (req, res) {
	res.status(200).send(new Insertion().sort(data));
});


app.get('/merge', function (req, res) {
	res.status(200).send(new Merge().sort(data));
});

app.get('/quick', function (req, res) {
	res.status(200).send(new Quick().sort(data));
});


app.listen(3000, function () {
	console.log('Chat Application listening on port 3000!')
});