// let Stripe = StripeAPI( Meteor.settings.private.stripe ); # there is not private object in meteor.settings. #JL 2017-10-20

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
  }
});
