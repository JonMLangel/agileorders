Template.itemSubmit.onCreated(function() {
  Session.set('itemSubmitErrors', {});
});

Template.itemSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('itemSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('itemSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.itemSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();
    
    var $item = $(e.target).find('[name=item]');
    var $itemPrice = $(e.target).find('[name=itemPrice]');
    var $itemDescription = $(e.target).find('[name=itemDescription]');
    var $itemType = $(e.target).find('[name=itemType]');
    var item = {
      item: $item.val(),
      itemPrice: Number($itemPrice.val()),
      itemDescription: $itemDescription.val(),
      itemType: $itemType.val(),
      businessId: Router.current().params._id
    };
    
    var errors = {};
    if (! item.item) {
      errors.item = "Please write some content";
      return Session.set('itemSubmitErrors', errors);
    }
    
    Meteor.call('itemInsert', item, function(error, itemId) {
      if (error){
        throwError(error.reason);
      } else {
        $item.val('');
        $itemPrice.val('');
        $itemDescription.val('');
        history.back();
      }
    });
  }
});