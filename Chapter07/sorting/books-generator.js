const fs = require('fs');
const uuid = require('uuid');
const books = [];

for(var i = 0; i < 5000; i++) {
	books.push({
		"id": uuid.v4(),
		"pages": Math.floor(Math.random() * (2000 - 300 + 1) + 300)
	})
}

fs.writeFile('books.json', JSON.stringify(books), (err) => {});