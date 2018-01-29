var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var Insertion = require('./sort/insertion');
var Merge = require('./sort/merge');
var Quick = require('./sort/quick');
var data = require('./books.json');

suite
	.add('Binary Insertion Sort', function(){
		new Insertion().sort(data);
	})
	.add('Merge Sort', function(){
		new Merge().sort(data);
	})
	.add('Quick Sort -> Simple', function(){
		new Quick().simpleSort(data);
	})
	.add('Quick Sort -> Lomuto', function(){
		new Quick().sort(data, undefined, undefined, 'lomuto');
	})
	.add('Quick Sort -> Hoare', function(){
		new Quick().sort(data);
	})
	.on('cycle', function(e) {
		console.log(`${e.target}`);
	})
	.on('complete', function() {
		console.log(`Fastest is ${this.filter('fastest').map('name')}`);
	})
	.run({ 'async': true });