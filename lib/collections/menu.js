Menu = new Mongo.Collection('menu');

Menu.allow({
  update: function(userId, menu) { return ownsDocument(userId, menu); },
  remove: function(userId, menu) { return ownsDocument(userId, menu); },
});

Meteor.methods({
  itemInsert: function(itemAttributes) {
    check(this.userId, String);
    check(itemAttributes, {
      businessId: String,
      item: String,
      itemPrice: Number,
      itemDescription: String,
      itemType: String
    });
    
    var user = Meteor.user();
    var business = Business.findOne(itemAttributes.businessId);

    if (!business)
      throw new Meteor.Error('invalid-comment', 'You must comment on a post');
    
    item = _.extend(itemAttributes, {
      userId: user._id
    });
    
    return Menu.insert(item);
  }
});