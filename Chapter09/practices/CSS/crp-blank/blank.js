var something = null;

function replaceValue () {
	var previousValue = something;

	// `unused` method loads the `previousValue` into closure scope
	
	function unused() {
		if (previousValue)
			console.log("hi");
	}

	// update something

	something = {
		str: new Array(1000000).join('*'),

		// all closures within replaceValue share the same
		// closure scope hence someMethod would have access
		// to previousValue which is nothing but its parent
		// object (`something`)


		// since `someMethod` has access to its parent
		// object, even when it is replaced by a new (identical)
		// object in the next setInterval iteration, the previous
		// value does not get garbage collected because the someMethod
		// on previous value still maintains reference to previousValue
		// and so on.

		someMethod: function () {}
	};

	previousValue = null;
}

setInterval(replaceValue, 1000);