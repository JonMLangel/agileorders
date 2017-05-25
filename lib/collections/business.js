Business = new Mongo.Collection('businesses');

Business.allow({
  update: function(userId, business) { return ownsDocument(userId, business); },
  remove: function(userId, business) { return ownsDocument(userId, business); },
});

//probably do not need this code because I want them to update all fields so no reason to deny like this
Business.deny({
  update: function(userId, business, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'name', 'address','city','state','zip','phone',
            'hours','deliveryRange','deliveryCharge').length > 0);
  }
});

validateRegistration = function (business) {
  var errors = {};

  if (!business.name)
    errors.name = "Please enter your business name";
  
  if (!business.address)
    errors.address =  "Please fill in your street address";

  return errors;
}


Meteor.methods({
  businessInsert: function(businessAttributes) { //TODO refactor method into it's own file 2017-5-24 JL
    check(this.userId, String);
    check(businessAttributes, {
      name: String,
      address: String,
      phone: String,
      city: String,
      state: String,
      zip: String,
      hours: String,
      deliveryRange: Number,
      deliveryCharge: Number
    });

    var errors = validateRegistration(businessAttributes);
    if (errors.title || errors.url)
      throw new Meteor.Error('invalid-post', "You must set a name and street address for your business");

    var sameBusinessName = Business.findOne({name: businessAttributes.name});
    var sameAddress = Business.findOne({address: businessAttributes.address});
    if (sameBusinessName && sameAddress) {
      return {
        businessExists: true,
        _id: sameBusinessName._id
      }
    }
    
    var user = Meteor.user();
    var business = _.extend(businessAttributes, {
      userId: user._id, 
      registered: new Date()
    });
    
    var businessId = Business.insert(business);
    
    return {
      _id: businessId
    };
  }
});