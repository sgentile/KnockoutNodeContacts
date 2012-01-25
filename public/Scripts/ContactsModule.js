require(["text!ContactAppTemplates.html", "ContactApp"], 
function(templates, contactApp) {
    $(function(){
    	//$("body").append(templates);
    	$(templates).appendTo($('body'));
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