Template.menuItem.onCreated( () => {
  let template = Template.instance();

  template.selectedService  = new ReactiveVar( false );
  template.processing       = new ReactiveVar( false );

  template.checkout = StripeCheckout.configure({
    key: Meteor.settings.public.stripe,
    locale: 'auto',
    token( token ) {
      let service = template.selectedService.get(),
          charge  = {
            amount: token.amount || service.amount,
            currency: token.currency || 'usd',
            source: token.id,
            description: token.description || service.description,
            receipt_email: token.email
          };

      Meteor.call( 'processPayment', charge, ( error, response ) => {
        if ( error ) {
          template.processing.set( false );
          throwError(error.reason);
        } else {
          alert("payment successful");
        }
      });
    },
    closed() {
      template.processing.set( false );
    }
  });
});

Template.menuItem.helpers({
  processing() {
    return Template.instance().processing.get();
  },
  paymentSucceeded() {
    return Template.instance().paymentSucceeded.get();
  },
  isOwner: function() {
    	return this.userId == Meteor.userId();
  }
});

Template.menuItem.events({
  'click #buy' ( event, template ) {
    const pricing = {
      'item': {
        amount: this.itemPrice * 100,
        description: this.itemDescription
      }
    };

    let service = pricing.item;
    template.selectedService.set( service );
    template.processing.set( true );

    template.checkout.open({
      name: 'Agile Orders',
      description: service.description,
      amount: service.amount,
      bitcoin: true
    });
  }
});