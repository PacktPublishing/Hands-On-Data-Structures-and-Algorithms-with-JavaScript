var Benchmark = require("benchmark");
var suite = new Benchmark.Suite();

var map = new Map();
var obj = {};

for(var i=0; i < 100; i++) {
	map.set(i, i);
	obj[i] = i;
}


suite
	.add("Object #get", function(){
		obj[19];
	})
	.add("Map #get", function(){
		map.get(19);
	})
	//
	.add("Object #delete", function(){
		delete obj[99];
	})
	.add("Map #delete", function(){
		map.delete(99);
	})
	.add("Object #length", function(){
		Object.keys(obj).length;
	})
	.add("Map #size", function(){
		map.size;
	})
	.on("cycle", function(e) {
		console.log("" + e.target);
	})
	.run();