## "Collection" Type
- NOTE: you cannot add one collection to another (???)
- NOTE: Subclasses MUST
	- define an `items` property
	- implement `add`, `remove`, `length`, `size`, `includes`

- how can we implicitly assume that if they say
		`function > collection`
	that we should apply it to each item in the collection?

- would be great to work internally with iterators rather than for loops...

- Singular vs plural agreement:
	- with
		`action move Card to Pile`
  	- automatically set up
  		`action move Cards to Pile:  for each card in cards: move card to pile`


- TODO:

```
define type Collection as Thing
	to be valid
		my items must be defined
```

### Creation
#### Creation with properties
- pull "items" out of properties and treat special
```
	on creation with <properties as object>
		// pull "items" property out special
		set items to remove property "items" of properties
		create me as thing with properties

		if items is defined
			if items is a collection
				add items to me
			else
				warn "Attempting to create {this.Type} with items property as {items.Type}"
```

#### Create with another collection
```
	on creation with <items as Collection>
		create me
		add items to me
```

#### Duplication
- When duplicating, make a copy of our `items` so the original `items` remains unaffected
```
	after copying
		set my items to copy of my items
```


### Size
```
	get size
		warn "Collection type {this.Type} must implement size"

	get length
	get the number of items
		return my size
```

### Containment/inclusion
```
	operator <collection> includes <item of any type>
		warn "Collection type {this.Type} must implement remove"

	operator <collection> does not include <item of any type>
		if this includes item return false
		return true

	operator <collection> includes <items as collection>
		for each item in items
			if this does not include
		return all items of collection
```


### Adding items
#### Add single item to the collection
```
	to add <item of any type>
		warn "Collection type {this.Type} must implement add"
```
#### Add another collection to this collection
```	to add <items as collection>
		for each item in items
			add item to me
```
#### Aliases for add which subclasses may implement specially
```


### Removing items
#### Remove single item to the collection
```
	to remove <item of any type>
		warn "Collection type {this.Type} must implement remove"
```
#### Remove another collection from this collection
```
	to remove <items as collection>
		remove item from me for each item in items
```
#### Clear entire collection
```
	to (clear | empty)
		remove my items from me
```
#### Remove duplicate items, leaving first occurance
```
	to remove duplicates
		results = empty copy of me
		for each item in me
			if item is not in results
				add item to results
		return results
```



### Iteration
#### Return an `iterator` for this collection.
- All for...each etc is implemented in terms of iterables.
- Note that we return a NEW iterator each time this is called!
- Note that modifying the collection mid-flight may mess up the iterator.
```
	get iterator
		warn "Collection type {this.Type} must implement iterator"
```

#### Stop iterating flag
```
	Collection.STOP = new Object
```

#### for each...in collection
- TODO: results go into `the results` ???
- TODO: how to pass specific item variable?
- TODO: how to pass keys to expression?
```
	operator for each item (in | of) <collection> <expression>
		results = new list
		iterator = the iterator of collection
		repeat
			get iterator.next()
			if it has property "done":
				return results

			item = the value of it
			result = expression(item)
			if result is Collection.STOP return results

			add result to results
```

#### all items in collection match expression
- e.g. `all items in collection have property "foobar"`
```
	operator all items (in | of) <collection> <expression>
		iterator = the iterator of collection
		repeat
			get iterator.next()
			if it has property "done":
				return true

			item = the value of it
			result = expression(item)
			if result is falsy return false
```

#### any items in collection match expression
- e.g. `any items in collection have property "foobar"`
```
	operator (any | some | at least one) (item | items) (in | of) <collection> <expression>
		iterator = the iterator of collection
		repeat
			get iterator.next()
			if it has property "done":
				return false

			item = the value of it
			result = expression(item)
			if result is truthy return true
```


### Logical Operations
- all of the below return a new collection of the same type.

#### Union of items in two collections
- Items

#### Items in this collection which are no in other collection.
```
	operator differences between <collection1> and <collection2>
		results = empty duplicate of collection1
		for each item in collection1
			add item to results if collection2 does not contain item
		return results

	operator <collection1> - <collection2>
		return differences between collection1 and collection2
```


- Results will be items in <his>
- TODO: union
- TODO: union as "+" operator
- TODO: differences
- TODO: differences as "-" operator


### Ranges
- TODO: <ordinalItem> to <ordinalItem> of <collection>
- TODO: the first <number> of items of <collection>
- TODO: the last <number> of items of <collection>
- TODO: <number> of random items of <collection>


### Grouping
- TODO: group <collection> into groups of 3
- TODO: group <collection> by <expression>


### Sorting / order
- TODO: reverse
- TODO: sort
- TODO: randomize


### Where Expressions
```
	operator <collection> where <condition as expression>
		set results to duplicate of collection
		for each item, key in collection
			get condition with item, key, collection
			if it is falsy then
				remove item from results
		return results
```
