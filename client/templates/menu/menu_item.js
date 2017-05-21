Template.menuItem.helpers({
  isOwner: function() {
    	return this.userId == Meteor.userId();
  }
});