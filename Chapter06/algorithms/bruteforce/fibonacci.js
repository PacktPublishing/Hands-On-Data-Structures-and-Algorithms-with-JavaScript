var _ = require('lodash');
var memory = {};
var count = 30;

console.time('fib');
bruteForceFibonacci(count);
console.timeEnd('fib');

function bruteForceFibonacci(count) {
	var prev = 0;
	var next = 1;

	_.times(count - 1, ()=> {
		var tmp = next;
		next = prev + next;
		prev = tmp;
	});

	return next;
}

function recursiveFibonacci(num) {
	if (num == 0) {
		return 0;
	} else if (num == 1 || num == 2) {
		return 1;
	} else {
		return recursiveFibonacci(num - 1) + recursiveFibonacci(num - 2);
	}
}

function memoizedFibonacci(num) {
	if (num == 0) {
		memory[num] = 0;
		return 0;
	} else if (num == 1 || num == 2) {
		memory[num] = 1;
		return 1;
	} else {
		if (!memory[num]) {
			memory[num] = memoizedFibonacci(num - 1) + memoizedFibonacci(num - 2);
		}

		return memory[num];
	}
}