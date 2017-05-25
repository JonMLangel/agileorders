@Shopping_Carts = new Meteor.Collection "shopping_carts"
@Schemas = {}
Schemas.shopping_carts = new SimpleSchema

  parent_business_id:
    type: String
    optional: false

  parent_user_id:
    type: String
    optional: false

  status:
    type: String
    optional: false

  menu_options_selected_by_user:
    type: [String]
    optional: true


Shopping_Carts.allow
  insert: -> true
  update: -> true
  remove: -> true