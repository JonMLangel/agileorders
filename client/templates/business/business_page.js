Template.businessPage.helpers({
  menu: function() {
    return Menu.find({businessId: this._id});
  }
});

Template.businessPage.events({
	'click #add': function(e) {
    e.preventDefault();
    Router.go("itemSubmit",{_id: Router.current().params._id});
  }

});