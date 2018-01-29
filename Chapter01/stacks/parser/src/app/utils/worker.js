init();

function init() {
	self.addEventListener('message', function(e) {
		var code = e.data;

		if(typeof code !== 'string' || code.match(/.*[a-zA-Z]+.*/g)) {
			respond('Error! Cannot evaluate complex expressions yet. Please try again later');
		} else {
			respond(evaluate(convert(code)));
		}
	});
}

function evaluate(postfix) {
	var resultStack = new Stack();
	postfix = clean(postfix.trim().split(" "));
	postfix.forEach(function (op) {
		if(!isNaN(parseFloat(op))) {
			resultStack.push(op);
		} else {
			var val1 = resultStack.pop();
			var val2 = resultStack.pop();
			var parseMethodA = getParseMethod(val1);
			var parseMethodB = getParseMethod(val2);
			if(op === "+") {
				resultStack.push(parseMethodA(val1) + parseMethodB(val2));
			} else if(op === "-") {
				resultStack.push(parseMethodB(val2) - parseMethodA(val1));
			} else if(op === "*") {
				resultStack.push(parseMethodA(val1) * parseMethodB(val2));
			} else if(op === "/") {
				resultStack.push(parseMethodB(val2) / parseMethodA(val1));
			} else if(op === "^") {
				resultStack.push(Math.pow(parseMethodB(val2), parseMethodA(val1)));
			}
		}
	});

	if(resultStack.size() > 1) {
		return "error";
	} else {
		return resultStack.pop();
	}
}

function isBalanced(postfix) {
	var count = 0;
	postfix.forEach(function(op) {
		if (op === ')') {
			count++
		} else if (op === '(') {
			count --
		}
	});

	return count === 0;
}

function getParseMethod(num) {
	return num % 1 === 0 ? parseInt : parseFloat;
}

function convert(expr) {
	var postfix = "";
	var ops = new Stack();
	var operators = {
		"^": {
			priority: 4,
			associativity: "rtl"
		},
		"*": {
			priority: 3,
			associativity: "ltr"
		},
		"/": {
			priority: 3,
			associativity: "ltr"
		},
		"+": {
			priority: 2,
			associativity: "ltr"
		},
		"-": {
			priority: 2,
			associativity: "ltr"
		}
	};

	expr = clean(expr.trim().replace(/\s+/g, "").split(/([\+\-\*\/\^\(\)])/));


	if (!isBalanced(expr)) {
		return 'error';
	}

	expr.forEach(function(exp) {
		if(!isNaN(parseFloat(exp))) {
			postfix += exp + " ";
		}  else if(exp === "(") {
			ops.push(exp);
		} else if(exp === ")") {
			while(ops.peek() !== "(") {
				postfix += ops.pop() + " ";
			}
			ops.pop();
		} else if("*^+-/".indexOf(exp) !== -1) {
			var currOp = exp;
			var prevOp = ops.peek();
			while("*^+-/".indexOf(prevOp) !== -1 && ((operators[currOp].associativity === "ltr" && operators[currOp].priority <= operators[prevOp].priority) || (operators[currOp].associativity === "rtl" && operators[currOp].priority < operators[prevOp].priority)))
			{
				postfix += ops.pop() + " ";
				prevOp = ops.peek();
			}
			ops.push(currOp);
		}
	});
	
	while(ops.size() > 0) {
		postfix += ops.pop() + " ";
	}
	return postfix;
}

function respond(m) {
	self.postMessage(m);
}

function clean(arr) {
	return arr.filter(function(a) {
		return a !== "";
	});
}


var Stack = (function () {
	var wmkey = {};
	var items = new WeakMap();

	items.set(wmkey, []);

	function Stack() {

	}

	Stack.prototype.push = function (element) {
		var stack = items.get(wmkey);
		stack.push(element);
	};
	Stack.prototype.pop = function () {
		var stack = items.get(wmkey);
		return stack.pop();
	};
	Stack.prototype.peek = function () {
		var stack = items.get(wmkey);
		return stack[stack.length - 1];
	};
	Stack.prototype.clear = function () {
		items.set(wmkey, []);
	};
	Stack.prototype.size = function () {
		return items.get(wmkey).length;
	};
	return Stack;
}());
