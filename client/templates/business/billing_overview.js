Template.billingOverview.onCreated( function() {
  templateDictionary = new ReactiveDict();
});


Template.billingOverview.helpers({
  plan: function(){
    // Get the current user.
  var user = Meteor.userId();
  // If we have a user, call to checkUserPlan on the server to determine
  // their current plan. We do this so that we don't have to publish the user's
  // subscription data to the client.
  if ( user ) {
    Meteor.call('getPlanDetails', user, function(error, response){
      if (error) {
        throwError(error.reason);
      } else {
        templateDictionary.set('plan', response);
      }
    });
  }
  // Return the result of the method being called.
  return templateDictionary.get('plan');
  }
});
