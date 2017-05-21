Template.businessPage.helpers({
isOwner: function() {
    return this.userId == Meteor.userId();
  },
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