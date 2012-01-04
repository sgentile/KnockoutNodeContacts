function ContactsViewModel(){
	var self = this;
	self.contactsArray = ko.observableArray([
		{firstname:'Steve', lastname: 'Gentile'}
	]);
}
$(function(){
	ko.applyBindings(new ContactsViewModel());
});

