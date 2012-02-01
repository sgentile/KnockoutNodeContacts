	
	require(["ContactApp"], 
function(contactApp) {
    $(function(){
		var expectedContact = {
			//id : uuid.v1(),
			firstname: "Steve",
			lastname : "Gentile",
			phonenumbers : [{
				//"id" : uuid.v1(), 
				"number": "111-111-1111"
			}]
		};
		
		var contactsViewModel = new ContactsViewModel();
		var mainRegionViewModel = new MainRegionViewModel();
		var router = new Router(mainRegionViewModel);
	
		var expectedComputedFullName = expectedContact.firstname + " " + expectedContact.lastname;
		
		//tests just against the view model-http://jsfiddle.net/rniemeyer/KF9k7/2/
		module("view model tests");
		//make sure we are on the home page:
		router.setLocation('/#/');
		
		test("validate correct page", function(){
			equals(router.getLocation(), '/#/', "correct location");
		});
		
		
        test("initial contacts length", function() {
        	equals(contactsViewModel.contactsArray().length, 1, "contacts length");
        });
        
        test("initial first item", function() {
           equals(contactsViewModel.contactsArray()[0].firstname(), expectedContact.firstname, "first item's firstname is Steve");
           equals(contactsViewModel.contactsArray()[0].lastname(), expectedContact.lastname, "first item's lastname is Gentile");
        });
        
        test("initial fullname computed item", function() {
           equals(contactsViewModel.contactsArray()[0].fullname(), expectedComputedFullName, "first item's fullname is Steve Gentile");
        });
	});
});