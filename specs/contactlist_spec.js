var site = require('./site/site.js').create("http://localhost:3000");

describe('Contact list feature', function(){

	it("should contain record with full name 'Steve Gentile'", function(){
		site
			.gotocontactlist()
			.contactexists("Steve Gentile");
	}); 	
});

