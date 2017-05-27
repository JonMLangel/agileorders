Template.businessPage.helpers({
	isOwner: function() {
    	return this.userId == Meteor.userId();
  	},
  	menu: function() {
      //keeping this it may be useful later
    	return Menu.find({businessId: this._id});
  	},
    appetizers: function(){
      return Menu.find({businessId: this._id, itemType: "Appetizer"});
    },
    meals: function(){
      return Menu.find({businessId: this._id, itemType: "Meal"});
    },
    entrees: function(){
      return Menu.find({businessId: this._id, itemType: "Entree"});
    },
    sides: function(){
      return Menu.find({businessId: this._id, itemType: "Side"});
    },
    drinks: function(){
      return Menu.find({businessId: this._id, itemType: "Drink"});
    },
    desserts: function(){
      return Menu.find({businessId: this._id, itemType: "Dessert"});
    }
});
Template.businessPage.events({
	'click #add': function(e) {
    e.preventDefault();
    Router.go("itemSubmit",{_id: Router.current().params._id});
  }
});