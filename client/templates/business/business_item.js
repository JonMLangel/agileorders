Template.businessItem.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
});