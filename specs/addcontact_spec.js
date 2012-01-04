var soda = require('soda');

var browser = null;
describe('add contact feature', function(){
	beforeEach(function(){
	browser = soda.createClient({
		host: 'localhost',
		port: 4444,
		url: 'http://localhost:3000',
		browser: 'firefox'
		});
	});

	it('add form should exist inside mainRegion', function(){
		browser
		.chain
		.session()
		.open('/')
		.waitForPageToLoad(3000)
//todo		.assertElementPresent('css=#mainRegion #addContactForm')			
		.testComplete()
		.end(function(err){
			if(err) throw err;
			console.log('done');
		});
	});
});

