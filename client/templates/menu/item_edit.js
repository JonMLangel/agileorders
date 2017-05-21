Template.itemEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentItemId = Router.current().params._id;
    
    var price = $(e.target).find('[name=itemPrice]').val();
    var item = {
      item: $(e.target).find('[name=item]').val(),
      itemPrice: Number(price),
      itemDescription: $(e.target).find('[name=itemDescription]').val()
    };
    
    Menu.update(currentItemId, {$set: item}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        history.back();
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this item?")) {
      var currentItemId = this._id;
      Menu.remove(currentItemId);
      history.back();
    }
  }
});