var express = require('express');
var app = express();
var message = require('./routes/messages');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/message', message);

app.get('/', function (req, res) {
	res.status(200).send('OK!')
});

app.listen(3000, function () {
	console.log('Chat Application listening on port 3000!')
});