var express = require('express');
var router = express.Router();
var Utils = require('../utils/messaging-utils');
const msgUtils = new Utils();

router.route('/')
	.post(function(req, res) {
		const message = req.body.message;
		let failedMessageQueue;
		let failureTriggerCount = 0;
		let failureTriggerCountThreshold = 3;
		let newMsgNode = {
			message: message,
			priority: 0
		};


		// try to send the message
		msgUtils.sendMessage(req.body)
			.then(function() {
				
				console.log('send success');

				// success
				res.send('OK!');

			}, function() {

				console.log('send failed');

				// get unique queue
				failedMessageQueue = msgUtils.getUniqueFailureQueue(req.body.from, req.body.to);

				// get front message in queue
				var frontMsgNode = failedMessageQueue.front();

				// already has a critical failure
				if (frontMsgNode && frontMsgNode.priority === 1) {

					// notify support

					// notify user
					res.status(500).send('Critical Server Error! Failed to send message');

				} else {

					// add more
					failedMessageQueue.add(newMsgNode);

					// increment count
					failureTriggerCount++;

					// trigger failure protocol
					triggerFailureProtocol();

				}
			});


		function triggerFailureProtocol() {

			console.log('trigger failure protocol');

			// get front message from queue
			var frontMsgNode = failedMessageQueue.front();

			// low priority and hasnt hit retry threshold
			if (frontMsgNode.priority === 0 && failureTriggerCount <= failureTriggerCountThreshold) {

				// try to send message
				msgUtils.sendMessage(frontMsgNode.message)
					.then(function() {

						console.log('resend success');
						// success, so remove from queue
						failedMessageQueue.remove();

						// inform user
						res.send('OK!');

					}, function() {

						console.log('resend failure');
						
						// increment counter
						failureTriggerCount++;

						//retry failure protocol
						triggerFailureProtocol();

					});

			} else {

				console.log('resend failed too many times');
				
				// replace top message with higher priority message
				let prevMsgNode = failedMessageQueue.remove();

				prevMsgNode.priority = 1;

				// gets added to front
				failedMessageQueue.add(prevMsgNode);

				res.status(500).send('Critical Server Error! Failed to send message');

			}
		}
	});

module.exports = router;