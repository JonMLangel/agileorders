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