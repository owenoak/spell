

//
// Method syntactic sugar
//
//
//	general notes:
//		- METHOD below means it can be one of:
//			- methodname			=> this.methodname
//			- "methodname"			=> this.methodname
//			- function(a,b){...}	=> passthrough
//			- {...}					=> function(){...}
//
	function(	a, 									// normal var
				b="blah", 							// default if null
				c:String,							// restrict to type, throws if invalid type or null passed in
				d:String:"blah"						// restrict to type, errors if invalid type passed in and uses default
	) {

	// unpack from list and object, all the trimmings
		var (a, b) = function(){...}

	// arguments to array with _splice
		var args = @args;							// return all args as an array
		var splat = @args(3);						// subset of args starting at index 3
		var splat = @args(1..2);					// subset of args starting from 1..2

	// super: only works if defined in:
	//			- class setup
	//			- monkey-patch setup
	//			- mixin setup (if defined in class?)
	//
		super()										// super of same method with same args
		super(splat)								// explicit args
		super.otherMethod()							// calling other method

	// explicit supering -- will always work
		as aClass()
		as aMixin()									// explicitly specify superclass/mixin for same method (add mixins to Class?)
		as aClass [do] otherMethod()
		as aMixin [do] otherMethod()				// explicitly specify superclass/mixin for other method

	// bind method
		@(method)									// bound method, always returns same one
		@(method, arg, arg)							// curry method, DOES NOT return same one on repeats

	// if at end ala python
		x.foo() if x								// =>  if (x is not empty) { x.foo() }
		x.foo() if x else "foo"						// =>  (x is not empty ? x.foo() : "foo")

	// avoid throwing for null variable
// NAME???
// ADOPT SWIFT x? SYNTAX???
		safe x.y.z.foo()							// =>  (x && x.y && x.y.z && typeof x.y.z.foo === "function" ? x.y.z.foo() : undefined)


	// equality
		is											// ==
		is not										// !==
		is exactly									// ===
		is not exactly								// !==

		x is null									// (x == null)
		x is not null								// (x != null)

		x is empty									// => (x == null || x === "" || x === NaN)
		x is not empty								// (!is empty)

		{is <condition>}							// function(it){return (it != null && it <condition>)}
		{is not <condition>}						// function(it){return (it != null && it <condition>)}


	// type coercion -- if they fail they'll return `undefined`
		it as string								// (it = Property.asString(it))
		it as string else "default"					// (it = Property.asString(it, "default"))
		it as number								// (it = Property.asNumber(it))
		it as float									// (it as number)
		it as int									// (it = Property.asNumber(it, null, "floor"))
		it as round int else 7						// (it = Property.asNumber(it, 7, "round"))
		it as boolean								// (it = Property.asBoolean(it))
		it as Array									// (it = Array.toArray(it))

	// type checking
		it is a string								// (typeof it === "string")
		it is a number								// (typeof it === "number")
		it is a float								// (it is a number)
		it is an int								// (it is a number)
		it is a boolean								// (typeof it === "boolean")
		it is a function							// (typeof it === "function")
		it is an Array								// Array.isArray(it)
		it is array like							// Property.isArrayLike(it)
		it is a[n] Something						// (Class.Something && it instanceof Class.Something)
													// NOTE: put Mixins and built-in objects on Class so this works for them as well.
	// various object bits
		prototype of object							// (object.constructor.prototype)
		object getter [for] property				// Object.__lookupGetter__(object, "property")
		object setter [for] property				// Object.__lookupSetter__(object, "property")
		object has getter [for] property			// (Object.__lookupSetter__(object, "property") !== undefined)
		object has setter [for] property			// (Object.__lookupSetter__(object, "property") !== undefined)


	// getting keys
		keys of object								// list of all public properties, including on protos
		own keys of object							// Object.getOwnPropertyNames()
		own public keys of object					// Object.getOwnPropertyNames(), eliminating non-enumerable properties
		inherited keys of object					// all keys for all protos, NOT including Object.prototype

	// property enumeration
		for key, value in thing {...}				// property enumeration of all public properties
		for own key, value in thing {...}			// property enumeration for own properties only
		for own public key, value in thing {...}	// property enumeration for own, public properties only
		for inherited key, value in thing {...}		// property enumeration for ALL enumerable and non-enumerable up to prototype
													// NOTE: skips those on Object.prototype?

	// array enumeration - work for array like things as well?
		for each in list {...}						// forEach(function(item,index) {...}), auto-binds to this?
		for each thing list {...}					// forEach(function(thing, index) {...}), item variable explicitly set
		for each thing, i in list {...}				// forEach(function(thing, i) {...}), thing and item variable explicitly set
		for each non null thing in list {...}		// skips null values
		for each non empty thing in list {...}		// skips null and empty string

	// getting parts of a list
		item 1 of list								// first item from list
		item <ordinal> of list						// ordinal = first, second, third, ... tenth, penultimate, last
		items 2..9 of list							// range 2-9, as a new list (same type)
		items ..9 of list							// range 0-9
		items 2.. of list							// range 2..last

	// removing from list
		trim list									// remove all empty items (null, NaN, "")
		remove [item] 2 from list					// remove & return single item, returns undefined if out of range
		remove <ordinal> item from list				// remove single item specified in english
		remove 2..4 from list						// remove range of items from list and return as array
		remove from list where {...}				// list.removeWhere(...)
		remove one from list where {...}			// as above, but stops after first one and returns it
		remove thing from list where {...}			// => `item` parameter explicitly set
		remove thing, index from list where {...}	// => `item` and `index` parameter explicitly set
		remove null items from list					// remove null items from the list
		remove empty items from list				// remove null items from the list
		remove "a" [,"b"...] from list				// remove one or more explicit items, returns array if you give more than one, else single item
		remove [items] in otherList from list		// remove all items from otherList, returns array

	// alternative syntax
		list.trim
		list.remove [item] 2
		list.remove <ordinal> [item]
		list.remove [item [,index]] where {...}
		list.remove first [item [,index] where {...}
		list.remove null [items]
		list.remove empty [items]
		list.remove "a"[,"b"...]
		list.remove from otherList


	// string.splitByLines() etc
		string.split by lines						// trim and split on runs of spaces/tabs
		string.split by words						// trim and split on spaces/returns
		string.split by commas						// trim and split on commas

		split string by lines						// trim and split on runs of spaces/tabs
		split string by words						// trim and split on spaces/returns
		split string by commas						// trim and split on commas


	// array/string syntactic sugar -- works for anything with indexOf()
		thing contains "a"							// (thing.indexOf("a") > -1)
		thing contains "a" or "b"...				// ((thing.indexOf("a") > -1)||thing.indexOf("b") > -1))
		thing contains one of []					// contains item from other list
		thing starts with "a"						// (indexOf() === 1...)
		thing ends with "a" or "b"					// (indexOf() === thing.length-1)


	// hooking up to events
		when object changed [do] {...}				// object.on("changed", function(){...}, this)
		one time object changed [do] {...}			// object.once("changed", function(){...}, this)
		first time object changed [do] {...}		// object.once("changed", function(){...}, this)
		before object changed [do] {...}			// object.before("changed", function(){...}, this)
		after object changed [do] {...}				// object.after("changed", function(){...}, this)
		ignore object changed						// object.off("changed", this)
		ignore object changed {...}					// object.off("changed", function(){...}, this)


	// alternative event syntax
		watch object.changed {...}					// object.on("changed", function(){...}, this)
		watch object.changed once {...}				// object.once("changed", function(){...}, this)
		ignore object.changed {...}					// object.off("changed", function(){...}, this)
		watch before object.changed {...}			// object.before("changed", function(){...}, this)
		watch after object.changed {...}			// object.after("changed", function(){...}, this)

	// async behavior
		on next tick METHOD							// do on next tick or animation frame, no coalescing
		do soon METHOD								// => this.soon(METHOD, 0)
		after TIME METHOD 							// => this.soon(METHOD, TIME)		TIME = 2 seconds, 2s, 2 milliseconds, 2ms
													// way to auto-cancel soon stuff ???

	// another way to do promises
		return wait for {...} then {...} catch(e) {...}

	// nested promises with implicit fail chaining
		wait for {...}
		then {...}
		then {...} catch (e) {...}
		then {...}
		then {...}
		catch (e) {...}
		... // NOTE: everything after this goes in an 'always' on the last promise?
		return promise;	// returns last promise from the above if none explicitly defined
	}






