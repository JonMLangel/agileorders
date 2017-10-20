/**
 * Created by jon on 5/29/17.
 */
Template.registration.onRendered = function () {
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
                number: $('[data-stripe="cardNumber"]').val(),
                exp_month: $('[data-stripe="expMo"]').val(),
                exp_year: $('[data-stripe="expYr"]').val(),
                cvc: $('[data-stripe="cvc"]').val()
            }, function () {
                var customer = {
                    name: $('[name="name"]').val(),
                    emailAddress: $('[name="emailAddress"]').val(),
                    password: $('[name="password"]').val(),
                    plan: $('[name="selectPlan"]:checked').val(),
                    token: $('[name="stripeToken"]').val()
                };

                var submitButton = $('input[type="submit"]').button('loading');
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
}