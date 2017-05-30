// /**
//  * Created by jon on 5/29/17.
//  */
Template.registration.onRendered(function() {
    $('#application-signup').validate({
        rules: {
            name: {
                required: true
            },
            emailAddress: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Please enter your name."
            },
            emailAddress: {
                required: "Please enter your email address to sign up.",
                email: "Please enter a valid email address."
            }
        },
        submitHandler: function () {
            STRIPE.getToken('#application-signup', {
                number: $('[name="cardNumber"]').val(),
                exp_month: $('[name="expMo"]').val(),
                exp_year: $('[name="expYr"]').val(),
                cvc: $('[name="cvc"]').val()
            }, function () {
                var customer = {
                    name: $('[name=name]').val(),
                    emailAddress: $('[name=emailAddress]').val(),
                    plan: $('[name="selectPlan"]:checked').val(),
                    token: $('[name="stripeToken"]').val()
                };
                var range = $('[name=deliveryRange]').val();
                var charge = $('[name=deliveryCharge]').val();
                var business = {
                    name: $('[name=name]').val(),
                    address: $('[name=address]').val(),
                    phone: $('[name=phone]').val(),
                    city: $('[name=city]').val(),
                    state: $('[name=state]').val(),
                    zip: $('[name=zip]').val(),
                    deliveryRange: Number(range),
                    deliveryCharge: Number(charge),
                    hours: $('[name=hours]').val()
                };
                var errors = validateRegistration(business);
                    if (errors.name|| errors.address)
                        return Session.set('registrationErrors', errors);

                    Meteor.call('businessInsert', business, function(error, result) {
                    // display the error to the user and abort
                    if (error)
                     return throwError(error.reason);

                    if (result.businessExists)
                     throwError('This business has already been registered');

                 Router.go('businessPage', {_id: result._id});
                    });

                Meteor.call('createTrialCustomer', customer, function (error, response) {

                    if (error) {
                        alert(error.reason);
                    } else {
                        if (response.error) {
                            alert(response.message);
                        } else {
                            return response;
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
