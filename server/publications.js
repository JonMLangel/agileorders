Meteor.publish('businesses', function() {
  return Business.find();
});

Meteor.publish('menu', function() {
  return Menu.find();
})