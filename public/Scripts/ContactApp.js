//function ContactsViewModel(){
//	this.contactsArray = ko.observableArray([
//		{firstname:'Steve', lastname: 'Gentile'}
//	]);
//}

//ko.applyBindings(new ContactsViewModel(), document.getElementById('contactsRegion'));
//ko.applyBindings(new ContactsViewModel());

function AppViewModel() {
    var self = this;
     
    self.people = ko.observableArray([
        { name: 'Bert' },
        { name: 'Charles' },
        { name: 'Denise' }
    ]);
     
    self.addPerson = function() {
        self.people.push({ name: "New at " + new Date() });
    };
     
    self.removePerson = function() {
        self.people.remove(this);
    }
}
 
ko.applyBindings(new AppViewModel());
