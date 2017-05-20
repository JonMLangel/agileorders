Template.businessList.helpers({
  business: function(){
    return Business.find({"userId" : Meteor.userId()});
  }
});