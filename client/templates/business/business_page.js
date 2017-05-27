Template.businessPage.helpers({
  menu: function() {
    return Menu.find({businessId: this._id});
  }
});