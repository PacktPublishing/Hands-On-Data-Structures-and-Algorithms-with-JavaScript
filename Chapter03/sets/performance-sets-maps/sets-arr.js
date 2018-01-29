var Benchmark = require("benchmark");
var suite = new Benchmark.Suite();

var set = new Set();
var arr = [];

for(var i=0; i < 1000; i++) {
	set.add(i);
	arr.push(i);
}


suite
	.add("array #indexOf", function(){
		arr.indexOf(100) > -1;
	})
	.add("set #has", function(){
		set.has(100);
	})
	//
	.add("array #splice", function(){
		arr.splice(99, 1);
	})
	.add("set #delete", function(){
		set.delete(99);
	})
	.add("array #length", function(){
		arr.length;
	})
	.add("set #size", function(){
		set.size;
	})
	.on("cycle", function(e) {
		console.log("" + e.target);
	})
	.run();