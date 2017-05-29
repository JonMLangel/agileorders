let Stripe = StripeAPI( Meteor.settings.private.stripe );

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
      // TODO check() both of our arguments here, but I've stripped this out for the sake of brevity. 2017-05-29 JL

      var stripeCustomer = new Future();

      Stripe.customers.create({
          source: token,
          email: email
      }, function(error, customer){
          if (error){
              stripeCustomer.return(error);
          } else {
              stripeCustomer.return(customer);
          }
      });

      return stripeCustomer.wait();
  },

  stripeCreateSubscription: function(customer, plan){
      // TODO check() both of our arguments here, but I've stripped this out for the sake of brevity. 2017-05-29 JL

      var stripeSubscription = new Future();

      Stripe.customers.createSubscription(customer, {
          plan: plan
      }, function(error, subscription){
          if (error) {
              stripeSubscription.return(error);
          } else {
              stripeSubscription.return(subscription);
          }
      });

      return stripeSubscription.wait();
  }
});
