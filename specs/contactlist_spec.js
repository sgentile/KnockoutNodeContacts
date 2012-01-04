var soda = require('soda');

var browser = null;
describe('Contact list feature', function(){
	
	beforeEach(function(){
	browser = soda.createClient({
		host: 'localhost',
		port: 4444,
		url: 'http://localhost:3000',
		browser: 'firefox'
		});
	});

	it('should exist', function(){
		browser
		.chain
		.session()
		.open('/')
		.waitForPageToLoad(3000)
		.assertElementPresent('id=contactsList')			
		.testComplete()
		.end(function(err){
			if(err) throw err;
			console.log('done');
		});
	});

	it("should contain record with full name 'Steve Gentile'", function(){
		browser
			.chain
			.session()
			.open('/')
			.waitForPageToLoad(3000)
			.assertElementPresent('css=#contactsList span:contains(Steve Gentile)')
			.testComplete()
			.end(function(err){
				if(err) throw err;
				console.log('done');
			});
	}); 	
});

