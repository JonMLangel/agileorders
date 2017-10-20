Template.orderPage.helpers({
  	menu: function() {
      //keeping this it may be useful later
    	return Menu.find({businessId: Router.current().params._id});
  	},
    appetizers: function(){
      return Menu.find({businessId: Router.current().params._id, itemType: "Appetizer"});
    },
    meals: function(){
      return Menu.find({businessId: Router.current().params._id, itemType: "Meal"});
    },
    entrees: function(){
      return Menu.find({businessId: Router.current().params._id, itemType: "Entree"});
    },
    sides: function(){
      return Menu.find({businessId: Router.current().params._id, itemType: "Side"});
    },
    drinks: function(){
      return Menu.find({businessId: Router.current().params._id, itemType: "Drink"});
    },
    desserts: function(){
      return Menu.find({businessId: Router.current().params._id, itemType: "Dessert"});
    }
});