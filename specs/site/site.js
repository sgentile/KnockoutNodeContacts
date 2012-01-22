var soda = require('soda');

var contactssite = function(root) {
  var browser = null; 

	var init = function() {
		 browser = soda.createClient({
			host: 'localhost',
			port: 4444,
			url: root,
			browser: 'firefox'
		});

		browser
				.chain
				.session();
	};

	var open = function() {
		browser
			.open('/')
			.waitForPageToLoad(3000)

		return this;
	};

	var contactexists = function(name) {
		browser
			.assertElementPresent('css=#contactsList span:contains(Steve Gentile)')
			.testComplete()
			.end(function(err){
				if(err) throw err;
			});

		return this;
	};

	init();

	return { gotocontactlist: open, 
					 contactexists: contactexists };
};

exports.create = function(root) { return new contactssite(root); };
