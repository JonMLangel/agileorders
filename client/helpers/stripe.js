/**
 * Created by jon on 5/29/17.
 */
Meteor.startup(function() {
    let stripeKey = Meteor.settings.public.stripe;
    Stripe.setPublishableKey( stripeKey );
    STRIPE = {
        getToken: function( domElement, card, callback ) {
            Stripe.card.createToken( card, function( status, response ) {
                if ( response.error ) {
                    alert(response.error.message, "danger" );
                } else {
                    STRIPE.setToken( response.id, domElement, callback );
                }
            });
        },
        setToken: function( token, domElement, callback ) {
            $( domElement ).append( $( "<input type='hidden' name='stripeToken' />" ).val( token ) );
            callback();
        }
    };
});