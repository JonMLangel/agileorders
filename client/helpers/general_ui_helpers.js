UI.registerHelper('plan', function(){
  // Get the current user.
  var user = Meteor.userId();
  var plan;
  // If we have a user, call to checkUserPlan on the server to determine
  // their current plan. We do this so that we don't have to publish the user's
  // subscription data to the client.
  if ( user ) {
    Meteor.call('getPlanDetails', user, function(error, response){
      if (error) {
        Session.set('plan', false);
        throwError(error.reason);
      } else {
        plan = new ReactiveVar(response);
        Session.set('plan', true);
      }
    });
  }
  plan = Session.get('plan');
  // Return the result of the method being called.
  return plan;
});

/*
* Epoch to String
* Convert a UNIX epoch string to human readable time.
*/

UI.registerHelper('epochToString', function(timestamp){
  if (timestamp){
    var length = timestamp.toString().length;
    if ( length == 10 ) {
      return moment.unix(timestamp).format("MMMM Do, YYYY");
    } else {
      return moment.unix(timestamp / 1000).format("MMMM Do, YYYY");
    }
  }
});