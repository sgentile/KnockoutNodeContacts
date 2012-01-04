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
		.assertElementPresent('id=contactsList', 2000)			
		.testComplete()
		.end(function(err){
			if(err) throw err;
			console.log('done');
		});
	});	
});

