Template.businessEdit.onCreated(function() {
  Session.set('businessEditErrors', {});
});

Template.businessEdit.helpers({
  errorMessage: function(field) {
    return Session.get('businessEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('businessditErrors')[field] ? 'has-error' : '';
  }
});

Template.businessEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentBusinessId = this._id;
    
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
    if (errors.name || errors.address)
      return Session.set('businessEditErrors', errors);
    
    Business.update(currentBusinessId, {$set: business}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('businessPage', {_id: currentBusinessId});
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this business?")) {
      var currentBusinessId = this._id;
      Business.remove(currentBusinessId);
      Router.go('businessList');
    }
  }
});