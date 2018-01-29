// input attributes and the target values

var _ = require('lodash');

var creditScore = ['Excellent', 'Good', 'Average', 'Poor'];
var creditAge = ['>10', '>5', '>2', '>=1'];
var remarks = ['0', '1', '2', '>=3'];
var utilization = ['Low', 'Medium', 'High'];
var hardInquiries = ['0', '1', '2', '>=3'];

// expected output structure
/* {
 "creditScore": "",
 "creditAge": "",
 "remarks": "",
 "utilization": "",
 "hardInquiries": "",
 "approval": ""
 } */


var all = [];
var even = [];
var odd = [];

// does not have to be optimal, this is a one time script
_.forEach(creditScore, function(credit) {

	// generate new object on each loop at top

	var resp = {};

	resp.creditScore = credit;

	_.forEach(creditAge, function(age) {

		resp.creditAge = age;

		_.forEach(remarks, function(remark) {

			resp.remarks = remark;

			_.forEach(utilization, function(util) {

				resp.utilization = util;

				_.forEach(hardInquiries, function(inq) {

					resp.hardInquiries = inq;

					// looping is by reference so persist a copy

					all.push(_.cloneDeep(resp));

				});
			});
		});
	});
});


for (var i = 0; i < all.length; i++) {

	// index is even
	if (i % 2 === 0) {

		// training data set
		even.push(all[i]);

	} else {

		// prediction data set (input)
		odd.push(all[i])

	}
}

// apply our fake algorithm to detect which application is approved
var trainingDataWithApprovals = applyApprovals(even);

// apply approval logic so that we know what to expect
var predictionDataWithApprovals = applyApprovals(odd);


function applyApprovals(data) {
	return _.map(data, function(d) {

		// Excellent credit score is approved, no questions asked

		if (d.creditScore === 'Excellent') {
			d.approved = 'Yes';
			return d;
		}

		// if credit score is good, then account should have a decent age
		//  not very high utilization, less remarks and less inquiries

		if (d.creditScore === 'Good' &&
			(d.creditAge != '>=1') &&
			(d.remarks == '1' || d.remarks == '0') &&
			d.utilization !== 'High' &&
			(d.hardInquiries != '>=3')) {
			d.approved = 'Yes';
			return d;
		}

		// if score is average, then age should be high, no remarks, not very high
		// utilization and little to no inquiries.

		if (d.creditScore === 'Average' &&
			(d.creditAge == '>5' || d.creditAge == '>10') &&
			d.remarks == '0' &&
			d.utilization !== 'High' &&
			(d.hardInquiries == '1' || d.hardInquiries == '0')) {
			d.approved = 'Yes';
			return d;
		}

		// reject all others including all Poor credit scores
		d.approved = 'No';
		return d;

	});
}

console.log(trainingDataWithApprovals);
console.log(predictionDataWithApprovals);