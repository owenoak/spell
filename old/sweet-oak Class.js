
// Classes/mixins
// Would be best to use ES6 syntax, but...
//	- it doesn't allow for mixing methods and properties, making documentation a bitch
//	- super() going up to mixins?

// Construct with our own class system anyway for mixins/etc, right?
//	- note `Class` to indicate our syntax
//	- for properties/etc, parse all and construct a single Property which does the right thing
//	- NOTE: may be difficult to monkey-patch!  eg: having super() etc just work.


// 	To figure out:
//		- how to provide super():
//			- in class setup		(create and stick on class?)
//			- in mixins				(use one from class.prototype?)
//			- in class.extend		(use one from class.prototype?)
//			- in instance.extend	(use one from class.prototype?)



//
//	TYPES for the below:
//		- METHOD: define as one of the following (all will be called on this)
//			- methodName		=> this.methodname,
//			- function(a,b){}	=> pass through
//			- {...}				=> creates function(){...}, will be called on this
//
//

//
//	General notes
//
//
//		- all methods/properties/events/etc can be decorated with a combination of the following
//			- private		A "private" property, non-enumerable, just a note to consumers
//			- protected		A "protected" property, non-enumerable, just a note to consumers
//			- constant		A "constant" property, non-enumerable, can't change (can change on subclass)
//							NOTE: you MUST provide values for constants
//			- static		Static method or property declaration.
//
//		- For all methods:
//			- You can provide a "hint" on return type as, which is very helpful for documentation.
//			- This is not a guarantee, (eg: it's not enforced) but you should try to stick to your contract.
//				- For simple types, use their keyword:  `string`, `number`, `float`, `int`, `boolean`, `function`
//				- list `null` or `undefined` if they're possible
//				- for Class instances, use the class name
//				- If more than one type (including null) is expected, indicate them all.
//				- eg:
//						`(undefined) aMethod(a,b){...}`
//						`(null,function) aMethod(a,b){...}`
//						`(Promise) aMethod(a,b){...}`
//
//
//		- For all property variants, you can define:
//
//			- onChange		On onChange() handler to be run AFTER the value is changed.
//							Define as:
//								- (nothing) or `true`	=> this.trigger("changed", [key, newValue, oldValue])
//								- eventName				=> this.trigger("eventName", [key, newValue, oldValue])
//															NOTE: trigger will call `this.method` if no event defined.
//								- METHOD as above
//							Eg:
//								property foo onChange						// will trigger "changed"
//								property foo onChange = updated				// will trigger "updated" instead
//								property foo onChange = function(){}		// will call that function on this
//								property foo onChange {alert(newValue)}		// transformed to function(key, newValue, oldValue){alert(newValue)}
//
//
//							Initial values:
//								- By default, if you provide an initial value, we will NOT trigger the onChanged handler when that value is set.
//								- However, when value is set during instance creation we WILL trigger the onChanged
//								- If you want to stop this, use			`property foo onChange skipInit`
//																  or	`property foo onChange = function(){} skipInit`
//
//			- filter		Filter() handler to coerce values BEFORE the value is changed, will be called on this.
//							The filter() should return (a possibly modified) value or throw if it doesn't like the value being set.
//							Define filter as:
//								- explicit type			=> string|boolean|number|int|round int|float|Array|type(...)
//								- METHOD as above
//
//							Error handling:
//								- By default, the throw will be caught and error()ed, and the value change ignored.
//								- If you want to throw instead, use		`property filter string else throw`
//								- If you want to swallow errors, use	`property filter string else ignore`  or
//																		`property quiet[ly] filter string`
//							Null values:
//								- By default, we assume null values are OK.
//								- If that's not the case, use			`property filter string not null`
//
//
//
//
//
	new Class ClassName extends SuperClass {
	// class meta-setup
		globalize										// true (default), false, or string for other global name
		constructor(...){...}							// explicit constructor, implicit constructor assumes this.extend(properties) pattern
		mixin MixinObject,"mixinName"					// mixins, generally before other properties but it doesn't matter

	// methods
		aMethod(...){}									// define methods inline, (see below for super() support)
		private aMethod(){}								// "private" property, non-enumerable, just a note to consumers
		protected aMethod(){}							// "protected" property, non-enumerable, just a note to consumers
		constant aMethod(){}							// "constant" property, non-enumerable, can't change (can change on subclass)


	// List expected return types for methods, for documentation only.
	// NOTE: no enforcement or guarantee!
		null aMethod() {}								// not expected to return anything
		int aMethod() {}								// asserts that it will return an int
		Promise aMethod() {}							// asserts that it will return a Promise instance
		(null,Array) aMethod() {}						// asserts that it returns null or an Array


	// class methods/properties - defined in same object, get all of the goodies as instance stuff
		static aMethod(){}								// class method, NOTE: no super() support
		static (int) aMethod(){}						// class method, NOTE: no super() support
		static private string aProperty	= "foo"


	// getter/setter (can do private, protected, onChange, etc as below)
		get aMethod()...								// define a getter
		set aMethod()...								// define a setter
		property aMethod {								// getter and setter and whatever else you like
			get()
			set(value)
			...
		}

	// add an onChange handler to any property


	// generic properties of any type
	// NOTE: all the below can use [private|protected|constant] as for methods
		property aProperty								// normal property of any type, value is undefined
		property aProperty = "blah"						// normal property with default value
		constant A_CONSTANT = "bar"						// MUST provide default!

	// basic types
	//	- will attempt to coerce via Property.getString()
	//	- default is to log an error() and ignore sets to other types
		string aProperty								// restricts to strings, value is undefined, null is ok
														// => aProperty filter string
		string aProperty = "bar"						// provides default value
		number aProperty								// restricts to numbers or null, if a string, will attempt to coerce
		float aProperty									// same as number above
		int aProperty									// restricts to integers via .floor(), if a string, will attempt to coerce
		round int aProperty								// restricts to integers via .round(), if a string, will attempt to coerce
		function aProperty								// restricts to a function.
		expression aProperty							// restructs to function.  If you provide a string, we'll wrap it w/ `return (...)`
		boolean expression aProperty					// restructs to function.  If you provide a string, we'll wrap it w/ `return !!(...)`

	// to throw on set to wrong type
		string aProperty = "bar" else throw				// use this format to throw instead of error() if invalid value set

	// null not ok (works for all property types below)
		string aProperty = "bar" not null				// will error() if assigning to wrong type or null, MUST provide a value
		string aProperty = "bar" not null else throw	// will throw if assigning to wrong type or null, MUST provide a value

	// objects & arrays (special case of type() below)
		Object aProperty								// simple object, value is `undefined` since no "="
		Array aProperty = [1,2,3]						// explicit default value shared by all instances

	// create an object or array automatically for each instance
		instance Object aProperty						// creates an empty object for each instance BEFORE property setup begins
		instance Array aProperty = [1,2,3]				// creates an filled array for each instance BEFORE property setup begins

	// inherited objects/arrays
		inherited object aProperty						// each instance gets its own array which protoclones to prototype's
		inherited array aProperty = [1,2]				// works for arrays too, you can provide a default for the base class

	// restrict to random classes by constructor
		type(Array) aProperty							// restrict to one constructors (Class.get()?  Class.X ?)
		type(Array,List) aProperty						// restrict to one or more constructors (Class.get()?  Class.X ?)
		instance type(List, Array) aProperty			// will auto-create first constructor in list with no args
		instance type(IndexedList("key")) aProperty		// will auto-create as `new IndexedList("key")`


	// alias one property to another
		alias aProperty as bar							// hooks up getter and setter, assumes aProperty was original property (???)
		alias aProperty.bar as baz readonly				// nested reference, getter defined only, baz will be undefined if aProperty is undefined

	// log property access or change for debugging
	// these modifiers MUST go first
		watch property aProperty						// log change to property AFTER change happens
		watch access [to] property aProperty			// log stacktrace as property is accessed (???)
		break on [change [to]] property aProperty		// call debugger() BEFORE property changes
		break on access [to] property aProperty			// call method BEFORE handing back property

	// message dictionary lookup
		message loadErrorMessage = "msg.dict.id"		// entry in message dictionary, as a constant dynamic getter

	// preference (assumes mixin "preferential")
		preference aProperty "default"					// default can be any type, we won't save default preference value back


	// publically declared events (assume "Evented" mixin)
	// 		- other objects register for event as  `object.on("changed",function(){}, this)` or `object.on("changed",function(){}, this)`
	//		- also can `object.once()`, `object.before()`, `object.after()`
	//		- trigger the event with `object.trigger()` or `object.triggerSoon()`
		event changed		 					// sets up `changed` event
			= METHOD							// calls METHOD after any `before` handlers
			before = METHOD						// calls METHOD *before* any `before` handlers
			finally  = METHOD					// calls METHOD *after* any "after" handlers
			log = true							// log event call sequence


	}

//
// Monkey-patch a class later
//	- sets up super() (can we do this automatically or do we have to pass super again?)
//
	extend Class ClassName {
		...
	}


//
//	Specific class goodies (how to do an "inherited macro"?)
//

	//Mixin.Attributed
		attribute fooBar								// dynamic lookup in `this.attributes.fooBar || this.attributes.foobar`
		attribute fooBar = "default"					// provide default if not found in attributes (NOTE: default won't save)
		attribute fooBar as foo							// lookup `this.attributes.foo`, assigns to `fooBar`
		number attribute fooBar							// coerce value to int, undefined if can't coerce
		float attribute fooBar							// coerce value to int, undefined if can't coerce
		int attribute fooBar							// coerce value to int, undefined if can't coerce
		boolean attribute fooBar						// coerce value to int, undefined if can't coerce


	// Widget class
		part $foobar "selector"									// live selector, "##" means based on our root

