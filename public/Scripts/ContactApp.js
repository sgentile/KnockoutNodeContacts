function Contact(data){
	var self = this;
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
}

function MainRegionViewModel(){ //need to rename this...
	var self = this;
	self.selectedView = ko.observable("main");
	//let's determine what is loaded by a route:
	Sammy(function(){
		this.get("#/", function(context){
			self.selectedView("main")
		});
		this.get("#/addContact", function(context){
			self.selectedView("addContact")
		});
	}).run('#/'); //.run('#/');	//will switch immediately
}

$(function(){
	ko.applyBindings(new ContactsViewModel(), document.getElementById('contactsRegion'));
	ko.applyBindings(new MainRegionViewModel(), document.getElementById('mainRegion'));
});


