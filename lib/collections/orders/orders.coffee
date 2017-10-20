@Orders = new Meteor.Collection 'orders'

Schemas.orders = new SimpleSchema

	order_unique_identifier: # Customer-facing, unique identifier for the order
		type: Number
		optional: true

	date_placed: # UNIX timestamp for then the order was placed
		type: Number
		optional: true

	method: # Whether the order is for DEL or PU
		type: String
		optional: true
		allowedValues: ['delivery', 'pickup']

	payment:
		type: String
		optional: true
		allowedValues: ['cash', 'card']

	restaurant_id: # unique id for the restaurant to which the order is sent
		type: String
		optional: true

	recipient_id: # Unique id for the user who placed the order
		type: String
		optional: true

	card: # CC information used to order
		type: Schemas.credit_cards
		optional: true

	address: # address to which the order is delivered
		type: Schemas.addresses
		optional: true

	items:
		type: [Schemas.order_items]
		optional: true