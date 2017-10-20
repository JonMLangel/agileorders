/**
 * Created by jon on 5/29/17.
 */
var Future = Npm.require('fibers/future');

Meteor.methods({
    createTrialCustomer: function(customer){
        check(customer, {
            name: String,
            emailAddress: String,
            plan: String,
            token: String
        });
        var emailRegex     = new RegExp(customer.emailAddress, "i");
        //var lookupCustomer = Meteor.users.findOne({"emails.address": emailRegex});
        var businessEmail = Business.findOne({emailAddress: emailRegex});
        //checking if email is associated with a business
        if ( !businessEmail ) {
            var newCustomer = new Future();
            Meteor.call('stripeCreateCustomer', customer.token, customer.emailAddress, function(error, stripeCustomer){
                console.log("in stripeCreateCustomer")

                if (error) {
                    console.log(error);
                } else {
                    var customerId = stripeCustomer.id;
                    var plan       = customer.plan;

                    console.log("customer created");

                    Meteor.call('stripeCreateSubscription', customerId, plan, function(error, response){
                        console.log("in stripeCreateSubscription")
                        if (error) {
                            console.log(error);
                        } else {
                            try {
                                var user = Meteor.user();
                                var subscription = {
                                    customerId: customerId,
                                    subscription: {
                                        plan: {
                                            name: customer.plan,
                                            used: 0
                                        },
                                        payment: {
                                            card: {
                                                type: stripeCustomer.sources.data[0].brand,
                                                lastFour: stripeCustomer.sources.data[0].last4
                                            },
                                            nextPaymentDue: response.current_period_end
                                        }
                                    }
                                }
                                console.log("subscription", subscription)

                                Meteor.users.update(user, {
                                    $set: subscription
                                }, function(error, response){
                                    if (error){
                                        console.log(error);
                                    } else {
                                        newCustomer.return(user);
                                    }
                                });
                            } catch(exception) {
                                newCustomer.return(exception);
                            }
                        }
                    });
                }
            });
            return newCustomer.wait();
        } else {
            throw new Meteor.Error('customer-exists', 'Sorry, that customer email already exists!');
        }
    }
});