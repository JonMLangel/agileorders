@Delivery_Zones = new Meteor.Collection 'delivery_zones'

Schemas.delivery_zones = new SimpleSchema

	description:
		type: String
		optional: true

	zips:
		type: [String]
		optional: true

	points: # A list of lat/lon points, forming a polygon in which the delivery zone applies
		type: [Schemas.lat_lon_point]
		optional: true

	hole_points: # A list of lat/lon points, forming a polygon in which the delivery zone does NOT apply. #TODO hole_points This will need some serious design.
		type: [Schemas.lat_lon_point]
		optional: true

	maximum_radius: # Distance between the restaurant and the furthest point in this zone to which it delivers.
		type: Number
		optional: true