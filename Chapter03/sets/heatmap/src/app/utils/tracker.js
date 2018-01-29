var sessionKeys = new Set();
var sessionData = new Map();
var startTime = Date.now();
var endTime;

self.addEventListener('message', function(e) {
	addEvent(e.data);
});

function addEvent(data) {
	var key = data.key || '';
	var event = data.event || '';
	var customValue = data.customValue || '';
	var currentOccurrences;
	
	var newItem = {
		eventX: event.pageX,
		eventY: event.pageY,
		timestamp: Date.now(),
		customValue: customValue ? customValue : ''
	};

	if (sessionKeys.has(key)) {
		currentOccurrences = sessionData.get(key);
		currentOccurrences.push(newItem);

		sessionData.set(key, currentOccurrences);
	} else {
		currentOccurrences = [];

		currentOccurrences.push(newItem);
		sessionKeys.add(key);

		sessionData.set(key, currentOccurrences);
	}

	if (Math.random() > 0.7) {
		syncWithServer(data.user);
	}
}


function syncWithServer(user) {
	endTime = Date.now();

	fakeSyncWithDB({
		startTime: startTime,
		endTime: endTime,
		user: user,
		data: Array.from(sessionData)
	}).then(function () {
		setupTracker();
	});
}

function fakeSyncWithDB(data) {
	//fake sync with DB
	return new Promise(function (resolve, reject) {
		resolve();
	});
}

function setupTracker() {
	startTime = Date.now();
	sessionData.clear();
	sessionKeys.clear();
}