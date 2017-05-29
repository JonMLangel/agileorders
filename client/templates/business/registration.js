// /**
//  * Created by jon on 5/29/17.
//  */
Template.registration.onRendered(function() {
    console.log("validating form");
    $('#application-signup').validate({
        rules: {
            name: {
                required: true
            },
            emailAddress: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            name: {
                required: "Please enter your name."
            },
            emailAddress: {
                required: "Please enter your email address to sign up.",
                email: "Please enter a valid email address."
            },
            password: {
                required: "Please enter a password to sign up.",
                minlength: "Please use at least six characters."
            }
        },
        submitHandler: function () {
            STRIPE.getToken('#application-signup', {
                number: $('[name="cardNumber"]').val(),
                exp_month: $('[name="expMo"]').val(),
                exp_year: $('[name="expYr"]').val(),
                cvc: $('[name="cvc"]').val()
            }, function (e) {
                var customer = {
                    name: $('[name=name]').val(),
                    emailAddress: $('[name=emailAddress]').val(),
                    password: $('[name=password]').val(),
                    plan: $('[name="selectPlan"]:checked').val(),
                    token: $('[name="stripeToken"]').val()
                };
                console.log("customer", customer)

                // var submitButton = $('input[type="submit"]').button('loading');
                console.log(customer);
                Meteor.call('createTrialCustomer', customer, function (error, response) {

                    if (error) {
                        alert(error.reason);
                        submitButton.button('reset');
                    } else {
                        if (response.error) {
                            alert(response.message);
                            submitButton.button('reset');
                        } else {
                            Meteor.loginWithPassword(customer.emailAddress, customer.password, function (error) {
                                if (error) {
                                    alert(error.reason);
                                    submitButton.button('reset');
                                } else {
                                    Router.go('/lists');
                                    submitButton.button('reset');
                                }
                            });
                        }
                    }
                });
            });
        }
    });
});
Template.registration.onCreated(function() {
  Session.set('registrationErrors', {});
});

Template.registration.helpers({
  errorMessage: function(field) {
    return Session.get('registrationErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('registrationErrors')[field] ? 'has-error' : '';
  }
});

Template.registration.events({
  'submit form': function(e) {
    e.preventDefault();
    var range = $(e.target).find('[name=deliveryRange]').val();
    var charge = $(e.target).find('[name=deliveryCharge]').val();
    var business = {
    	name: $(e.target).find('[name=name]').val(),
    	address: $(e.target).find('[name=address]').val(),
    	phone: $(e.target).find('[name=phone]').val(),
    	city: $(e.target).find('[name=city]').val(),
    	state: $(e.target).find('[name=state]').val(),
    	zip: $(e.target).find('[name=zip]').val(),
    	deliveryRange: Number(range),
    	deliveryCharge: Number(charge),
    	hours: $(e.target).find('[name=hours]').val()
    };

    var errors = validateRegistration(business);
    if (errors.name|| errors.address)
      return Session.set('registrationErrors', errors);

    // STRIPE.getToken('#application-signup', {
    //   number: $('[name="cardNumber"]').val(),
    //   exp_month: $('[name="expMo"]').val(),
    //   exp_year: $('[name="expYr"]').val(),
    //   cvc: $('[name="cvc"]').val()
    // }, function () {
    //   var customer = {
    //       name: $(e.target).find('[name=name]').val(),
    //       emailAddress: $(e.target).find('[name=emailAddress]').val(),
    //       password: $(e.target).find('[name=password]').val(),
    //       plan: $(e.target).find('[name="selectPlan"]:checked').val(),
    //       token: $('[name="stripeToken"]').val()
    //   };
    //   console.log("customer", customer);
    //   Meteor.call('createTrialCustomer', customer, function (error, response) {
    //       console.log("error", error);
    //       console.log("response", response);
    //   });
// });

    Meteor.call('businessInsert', business, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      if (result.businessExists)
        throwError('This business has already been registered');

      Router.go('businessPage', {_id: result._id});
    });
  }
});