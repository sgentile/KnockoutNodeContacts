function Contact(data){
	var self = this;
	self.id = ko.observable(data.id);
	self.firstname = ko.observable(data.firstname);
	self.lastname = ko.observable(data.lastname);
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
}


function MainRegionViewModel(){ //need to rename this...
	var self = this;
	self.selectedView = ko.observable("mainView");
	self.newContact = ko.observable();
	self.editContact = ko.observable();
	//let's determine what is loaded by a route:
	var app = Sammy(function(){
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
			var temp = self.newContact();
			var contact = {
				id : null,
				firstname: temp.firstname,
				lastname : temp.lastname
			}
			amplify.publish("addNewContactEvent", contact);
			self.newContact({id:null, firstname:"", lastname:""});
			return false;
		});
	});
	
	app.run('#/'); //.run('#/');	//will switch immediately
	
	self.addContact = function(formElement){
		var temp = self.newContact();
		var contact = {
			id : null,
			firstname: temp.firstname,
			lastname : temp.lastname
		}
		amplify.publish("addNewContactEvent", contact);
	}
}

$(function(){
	ko.applyBindings(new ContactsViewModel(), document.getElementById('contactsRegion'));
	ko.applyBindings(new MainRegionViewModel(), document.getElementById('mainRegion'));
});


