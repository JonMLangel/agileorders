@Restaurants = new Meteor.Collection 'restaurants'

Schemas.restaurants = new SimpleSchema

	name:
		type: String
		optional: true

	url:
		type: String
		optional: true

	streetAddress:
		type: String
		optional: true

	city:
		type: String
		optional: true

	state:
		type: String
		optional: true

	zip:
		type: String
		optional: true

	latitude:
		type: String
		optional: true

	longitude:
		type: String
		optional: true


	food_types: # ['Seafood', 'Sushi', 'Cocktails']
		type: Array
		optional: true

	offers_delivery:
		type: Boolean
		optional: true

	delivery_price: # price for delivery to a relavant address. if no address/restaurant does not deliver to address, null
		type: String
		optional: true

	delivery_minimum:
		type: String
		optional: true

	minimum_free_delivery: #Subtotal requirement to qualify for free delivery
		type: String
		optional: true

	logo_url:
		type: String
		optional: true

	open: # Allow check for whether the time is within a restaurant;s open hours.
		type: true
		optional: true

	hours: # A map of day of the week to an array of hours for which the restaurant is open. eg: {"Monday": ["06:00 AM - 12:00 AM"]}
		type: Object
		optional: true

	'hours.monday':
		type: [String]
		optional:true

	'hours.tuesday':
		type: [String]
		optional:true

	'hours.wednesday':
		type: [String]
		optional:true

	'hours.thursday':
		type: [String]
		optional:true

	'hours.friday':
		type: [String]
		optional:true

	'hours.saturday':
		type: [String]
		optional:true

	'hours.sunday':
		type: [String]
		optional:true

	timezone: # The name of the timezone in which the restaurant's hours are represented. eg: US/Central, US/Eastern
		type: String
		optional: true

	zones: # An array of geographical zones to which the restaurant delivers
		type: [Schemas.delivery_zones]
		optional: true
