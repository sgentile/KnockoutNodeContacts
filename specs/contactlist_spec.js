require('jasmine-node');
var soda = require('soda'), 
	assert = require('assert');

var browser = null;

describe('Contact list feature', function(){
	it('should exist', function(){
		browser
			.chain()
			.open('/Contact')
			.waitForElementPresent('id=dtContacts', 2000)			
			.testComplete()
			.end(function(err){
				if(err) throw err;
				console.log('done');
			)};	
	);
});
