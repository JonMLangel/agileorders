Meteor.methods({

  getPlanDetails: function(user){
    // Check our user argument against our expected pattern.
    check(user, String);

    // Query for our user and get their current plan information.
    var hasPlan = Business.findOne({"userId": Meteor.userId()});
    if(hasPlan){
      var getUser      = Meteor.users.findOne({"_id": user}, {fields: {"subscription": 1}}),
        subscription = getUser.subscription;
    }
    

    // Find the correct plan in our plans array (defined in /settings.json).
    var availablePlans = Meteor.settings.public.plans;
    var currentPlan    = _.find(availablePlans, function(plan){ return plan.name == subscription.plan.name; });
    var amount         = currentPlan.amount.usd;

    // If we get a plan back, return to the client for use.
    if( subscription ){
      var planData = {
        subscription: subscription,
        amount: amount
      }
      return planData;
    } else {
      return false;
    }
  }

});