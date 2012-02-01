var Contact = function(data){
	var self = this;
	if(!data){
		data = {
			id : null,
			firstname : "",
			lastname : ""
		}
	}
	self.id = ko.protectedObservable(data.id);
	self.firstname = ko.protectedObservable(data.firstname);
	self.lastname = ko.protectedObservable(data.lastname);
	self.fullname = ko.computed(function(){
		return self.firstname() + " " + self.lastname();
	});
};

var ContactsViewModel = function(){
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
};


var MainRegionViewModel = function(){ //need to rename this...
	var self = this;
	self.selectedView = ko.observable("mainView");
	self.newContact = ko.observable();
	self.editContact = ko.observable();
};

var Router = function(main){
	this.app = Sammy(function(){
		this.get("#/", function(context){
			main.selectedView("mainView");
		});
		this.get("#/addContact", function(context){
			main.newContact(new Contact());
			main.selectedView("addContactView");
		});
		this.get("#/editContact", function(context){
			//todo get user information ...
			//self.editContact(new Contact({firstname:"Joe", lastname:"Smo"}));
			main.selectedView("editContactView");
		});
		this.post("#/post/addContact", function(){
			main.newContact().firstname.commit();
			main.newContact().lastname.commit();
			
			var contact = ko.toJS(main.newContact);
			
			amplify.publish("addNewContactEvent", contact);
			main.newContact(new Contact());
			return false;
		});
		this.put("#/put/editContact", function(context){
			main.editContact().firstname.commit();
			main.editContact().lastname.commit();
			
			var contact = ko.toJS(main.editContact);
			
			amplify.publish("updateContactEvent", contact);
			return false;
		});
	});
	
	this.app.run('#/'); //.run('#/');	//will switch immediately

	return this.app;
};






