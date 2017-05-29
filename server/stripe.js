let Stripe = StripeAPI( Meteor.settings.private.stripe );
var Future = Npm.require('fibers/future');
Meteor.methods({
  processPayment( charge ) {
    check( charge, {
      amount: Number,
      currency: String,
      source: String,
      description: String,
      receipt_email: String
    });

    let handleCharge = Meteor.wrapAsync( Stripe.charges.create, Stripe.charges ),
        payment      = handleCharge( charge );

    return payment;
  },

  stripeCreateCustomer: function(token, email){
      check(token, String);
      check(email, String);
      var stripeCustomer = new Future();
     
      Stripe.customers.create({
          source: token,
          email: email
      }, function(error, customer){
          if (error){
              console.log("error creating customer", error)
              stripeCustomer.return(error);
          } else {
              stripeCustomer.return(customer);
          }
      });

      return stripeCustomer.wait();
  },

  stripeCreateSubscription: function(customer, plan){
      console.log("plan name", plan);
      check(customer, String);
      check(plan, String);
      var stripeSubscription = new Future();

      Stripe.customers.createSubscription(customer, {
          plan: plan
      }, function(error, subscription){
          if (error) {
              console.log("error creating subscription", error);
              stripeSubscription.return(error);
          } else {
              stripeSubscription.return(subscription);
          }
      });

      return stripeSubscription.wait();
  }
});
