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
$(function(){
	ko.applyBindings(new ContactsViewModel(), document.getElementById('contactsRegion'));
});

