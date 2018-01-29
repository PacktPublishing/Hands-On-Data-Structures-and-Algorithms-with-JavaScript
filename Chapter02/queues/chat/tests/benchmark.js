var Benchmark = require("benchmark");
var suite = new Benchmark.Suite();
var CircularDequeue = require("../utils/circular-dequeue.js");
var SimpleQueue = require("../utils/queue.js");

var cdQueue = new CircularDequeue();
var simpleQueue = new SimpleQueue();
var array = [];

for(var i=0; i < 10; i++) {
	cdQueue.push(i);
	simpleQueue.add(i);
	array.push(i);
}

// var i = 1000;
//
// while(i--){
// 	cdQueue.push(i);
// 	array.push(i);
// }
// console.log('Running Dictionary Mode Array');

suite
	.add("circular-queue push", function(){
		cdQueue.push(cdQueue.shift());
	})
	.add("regular array push", function(){
		array.push(array.shift());
	})
	.add("circular-queue pop", function(){
		cdQueue.pop();
	})
	.add("regular array pop", function(){
		array.pop();
	})
	.add("circular-queue unshift", function(){
		cdQueue.unshift(cdQueue.shift());
	})
	.add("regular array unshift", function(){
		array.unshift( array.shift());
	})
	.add("circular-queue shift", function(){
		cdQueue.shift();
	})
	.add("regular array shift", function(){
		array.shift();
	})
	.on("cycle", function(e) {
		console.log("" + e.target);
	})
	.run();

// .add("simple queue push", function(){
// 	simpleQueue.add(simpleQueue.remove());
// })


// suite
// 	.add("regular array push", function(){
// 		array.push(array.shift());
// 	})
// 	// .add("simple queue push", function(){
// 	// 	simpleQueue.add(simpleQueue.remove());
// 	// })
// 	.on("cycle", function(e) {
// 		console.log("" + e.target);
// 		console.log(process.memoryUsage());
// 	})
// 	.run();