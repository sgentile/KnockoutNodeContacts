function Contact(data){
	var self = this;
	self.id = ko.protectedObservable(data.id);
	self.firstname = ko.protectedObservable(data.firstname);
	self.lastname = ko.protectedObservable(data.lastname);
	self.fullname = ko.computed(function(){
		return self.firstname() + " " + self.lastname();
	});
}

function ContactsViewModel(){
	var self = this;
	self.contactsArray = ko.observableArray([]);
	
	$.getJSON("/Contact", function(data){
		var mappedContacts = $.map(data, function(item){
			return new Contact(item);
		});
		self.contactsArray(mappedContacts);
	});
	
	amplify.subscribe("addNewContactEvent", function(contact){
		console.log(contact);
		$.post("/Contact", contact, function(data){
			self.contactsArray.push(new Contact(data));	
		});
	});
	
	amplify.subscribe("updateContactEvent", function(contact){
		$.ajax({
				url: "/Contact/" + contact.id,
				type: 'PUT',
		        data: contact,
		        success: function(){
		        	//self.contactsArray.remove(contact);
		        },
		        dataType: 'json'
			});	
	});
	
	self.removeContact = function(contact){		
		if(confirm("Are you sure you want to delete this contact?")){
			$.ajax({
				url: "/Contact/" + contact.id(),
				type: 'DELETE',
		        data: {},
		        success: function(){
		        	self.contactsArray.remove(contact);
		        },
		        dataType: 'json'
			});	
		}
	}
	self.editContact = function(contact){
		amplify.publish('showEditContactEvent', contact);
	}
}


function MainRegionViewModel(){ //need to rename this...
	var self = this;
	self.selectedView = ko.observable("mainView");
	self.newContact = ko.observable();
	self.editContact = ko.observable();
	
	//let's determine what is loaded by a route:
	self.app = Sammy(function(){
		this.get("#/", function(context){
			self.selectedView("mainView");
		});
		this.get("#/addContact", function(context){
			self.newContact({id:null, firstname:"", lastname:""});
			self.selectedView("addContactView");
		});
		this.get("#/editContact", function(context){
			//todo get user information ...
			//self.editContact(new Contact({firstname:"Joe", lastname:"Smo"}));
			self.selectedView("editContactView");
		});
		this.post("#/post/addContact", function(){
			
			var contact = ko.toJS(self.newContact);
			
			amplify.publish("addNewContactEvent", contact);
			self.newContact({id:null, firstname:"", lastname:""});
			return false;
		});
		this.put("#/put/editContact", function(context){
			self.editContact().firstname.commit();
			self.editContact().lastname.commit();
			
			var contact = ko.toJS(self.editContact);
			
			amplify.publish("updateContactEvent", contact);
			return false;
		});
	});
	
	self.app.run('#/'); //.run('#/');	//will switch immediately
	
	amplify.subscribe('showEditContactEvent', function(contact){
		self.app.setLocation("#/editContact");
		self.editContact(contact);		
	});
}

$(function(){
	var contactsViewModel = new ContactsViewModel();
	var mainRegionViewModel = new MainRegionViewModel();
	
	ko.applyBindings(contactsViewModel, document.getElementById('contactsRegion'));
	ko.applyBindings(mainRegionViewModel, document.getElementById('mainRegion'));
	
	var viewModels={
		contacts : contactsViewModel,
		main : mainRegionViewModel
	}
	amplify.publish("runTests", viewModels);
});

//tests:
amplify.subscribe('runTests', function(models){
			var contactsViewModel = models.contacts;
			var mainRegionViewModel = models.main;
			
			var expectedContact = {
				//id : uuid.v1(),
				firstname: "Steve",
				lastname : "Gentile",
				phonenumbers : [{
					//"id" : uuid.v1(), 
					"number": "111-111-1111"
				}]
			};
			
			var expectedComputedFullName = expectedContact.firstname + " " + expectedContact.lastname;
			
		
			//tests just against the view model-http://jsfiddle.net/rniemeyer/KF9k7/2/
   			module("view model tests");
 			//make sure we are on the home page:
 			mainRegionViewModel.app.setLocation('#/');
 			
 			test("validate correct page", function(){
 				equals(mainRegionViewModel.app.getLocation(), '/#/', "correct location");
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
	





