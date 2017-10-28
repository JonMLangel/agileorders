# PURPOSE: General Point of Sale stateless class
# HISTORY: Created 2017-10-27 by Jonathon Langel

# ***************************************************************************************************
# Consider simplifying classes by preferring stateless over stateful and preferring containment over inheritance
#   1. https://coffeescript-cookbook.github.io/chapters/classes_and_objects/class-variables-and-instance-variables
#   2. https://coffeescript-cookbook.github.io/chapters/classes_and_objects/class-methods-and-instance-methods
#
# class properties
#   public instance (example: constructor:() -> this.property=[...])
#
# class methods
#   public instance (example: method:() ->  [...];  result=new Obj_Class.method())
#   public static   (example: @method:() -> [...];  result=Obj_Class.method())
#   private static  (example: _method=() -> [...];  result=_method())
# ***************************************************************************************************


class @Agile_Pos # common convention to capitalize class type and lower case class instance ("_Class" added to "stateful" class names)


	# ***************************************************************************************************
	#   class constructor    (not used by stateless classes)
	# ***************************************************************************************************


	# constructor: () ->


	# ***************************************************************************************************
	#   public static   (example: @method:() -> [...];  result=Obj_Class.method())
	# ***************************************************************************************************

