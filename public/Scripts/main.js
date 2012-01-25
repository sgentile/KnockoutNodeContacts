require(
	["order!http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js", 
	"order!Thirdparty/knockout",
	"order!Thirdparty/knockout-extensions",
	"order!Thirdparty/sammy",
	"order!Thirdparty/amplify",
	"order!ContactApp"
	], function() {
    $(function(){
    	var contactsViewModel = new ContactsViewModel();
		var mainRegionViewModel = new MainRegionViewModel();
		
		ko.applyBindings(contactsViewModel, document.getElementById('contactsRegion'));
		ko.applyBindings(mainRegionViewModel, document.getElementById('mainRegion'));
		
		var router = new Router(mainRegionViewModel);
		
		amplify.subscribe('showEditContactEvent', function(contact){
			router.setLocation("#/editContact");
			mainRegionViewModel.editContact(contact);		
		});
		
		var viewModels={
			contacts : contactsViewModel,
			main : mainRegionViewModel,
			router : router
		}
		amplify.publish("runTests", viewModels);
    });
});