Template.itemEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentItemId = Router.current().params._id;
    
    var price = $(e.target).find('[name=itemPrice]').val();
    var item = {
      item: $(e.target).find('[name=item]').val(),
      itemPrice: Number(price),
      itemDescription: $(e.target).find('[name=itemDescription]').val(),
      itemType: $(e.target).find('[name=itemType]').val()
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
    let currentItemId = this._id;
    swal({
        title:"Are you sure you want to delete this?",
        text: "This will delete your menu item",
        showCancelButton: true,
        confirmButtonColor: '#dd6b55',
        cancelButtonColor: '#d44',
        confirmButtonText: "Yes, delete item!",
        cancelButtonText: 'Cancel'
    }, function() {
        swal(
            'Deleted!'
        )
        console.log("currentItemId", currentItemId)
      Menu.remove(currentItemId);
      history.back(); //TODO once we have user roles, we should make this a direct Router.go to /manage/:id where id is business 2017-05-25 JL
    })
  }
});