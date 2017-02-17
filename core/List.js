
// TODO:
//	- intersection with collection?
//	- unique
//	- non empty
//	- types
//	- can_add_item()

export class List {
	// Class reflection semantics
	Type = List
	static Types = [List]
	static name = "lists"
	static names = "lists"
	static Name = "Lists"
	static Names = "Lists"

	// Actual items in this list
	items = []

	// Create a new instance of the base type of list.
	@action("create <List>", { types: [ List ], returns: List })
	static create_empty(list) {
		if (!(list instanceof List)) return false
		return new (list.constructor)()
	}

	// Create a duplicate of this list, but with independent list of items.
	@action("duplicate <List>", { types: [ List ], returns: List })
	static duplicate(list) {
		if (!(list instanceof List)) return false
		duplicate = List.create_empty(list)
		Object.assign(duplicate, list)
		List.set_items(list, list)
		return duplicate
	}

	// Create a duplicate of this list, but with independent list of items.
	@action("duplicate <List> with <items as List>", { types: [ List, List ], returns: List })
	static duplicate_with_items(list, items) {
		if (!(list instanceof List)) return false
		if (!(items instanceof List)) return false
		duplicate = List.create_empty(list)
		Object.assign(duplicate, list)
		List.set_items(duplicate, items)
		return duplicate
	}


//>	### Proxying from list

	@expression("length of <List>", {
		alias: ["size of <List>", "number of items (of|in) <List>"]
		types: [ List ],
		returns: Integer
	})
	static length(list) {
		if (!(list instanceof List)) return undefined
		return list.items.length
	}

	@expression("<List> is empty", { inverse: "<List> is not empty", types: [ List ], returns: Boolean })
	static is_empty(list) {
		if (!(list instanceof List)) return false
		return list.items.length === 0
	}


	@expression("position of <item> in <List>", { types: [ undefined, List ], returns: Integer })
	// 1-based!!!  returns `undefined` if not present
	static position_of(list, item) {
		if (!(list instanceof List)) return undefined
		let index = list.items.indexOf(item)
		if (index === -1) return undefined
		return index + 1
	}

	@expression("<item> is in <List>", { inverse: "<item> is not in <List>", types: [ undefined, List ], returns: Boolean })
	static is_in(list, item) {
		if (!(list instanceof List)) return false
		if (!list.items.contains(item)) return false
		return true
	}

	//
	// Accessors
	//

	// 1-based!!! returns `undefined` if not present
	@expression("item <position> of <List>", { types: [ undefined, List ], returns: undefined })
	static item_of(list, position) {
		if (!(list instanceof List)) return undefined
		return list.items[position - 1]
	}

	@expression("first item of <List>", { types: [ List ], returns: undefined })
	static first_item_of(list) {
		if (!(list instanceof List)) return undefined
		return list.items[0]
	}

	@expression("last item of <List>", { types: [ List ], returns: undefined })
	static last_item_of(list) {
		if (!(list instanceof List)) return undefined
		return list.items[list.items.length - 1]
	}

	@expression("random item of <List>", { types: [ List ], returns: undefined })
	static random_item_of(list) {
		if (!(list instanceof List)) return undefined
		if (!(list instanceof List)) return false
		let random_index = Math.floor(Math.random() * list.items.length)
		return list.items[random_index]
	}

	// Returns **clone** of list with new items.
	// 1-based!!! returns `undefined` if not present
	@expression("items <start> to <end> of <List>", { types: [ Integer, Integer, List ], returns: List })
	static range(list, start, end) {
		if (!(list instanceof List)) return undefined
		if (!(start instanceof Integer)) return undefined
		if (!(end instanceof Integer)) return undefined

		if (end === undefined) end = list.items.length
		let duplicate = List.duplicate(list)
		duplicate.items = list.items.slice(list, start - 1, end)
		return duplicate
	}

	@expression("items (in|of) <List> starting with <item>", { types: [ List, undefined ], returns: List })
	static items_starting_with(list, item) {
		if (!(list instanceof List)) return undefined
		let start = list.position_of(item)
		if (start === undefined) return undefined
		return List.range(list, start)
	}

	// Returns **clone** of list with new items.
	@expression("items (in|of) <List> where <method>", { types: [ List, Function ], returns: List })
	static items_where(list, method) {
		if (!(list instanceof List)) return undefined
		if (!(method instanceof Function)) return undefined
		results = List.duplicate(list)
		List.empty(results)
		for (let item in list.items) {
			if (Type.is_truthy(method(item))) List.add(results, item)
		}
		return results
	}


	//
	// Iterators
	//
	// NOTE: this returns a generic List, no matter the original type!
//TODO: how to let `item` vary here?
	@expression("for each item in <List> <method>", { types: [ List, Function ], returns: List })
	static for_each(list, method) {
		if (!(list instanceof List)) return undefined
		if (!(method instanceof Function)) return undefined
		results = new List()
		for (let item in list.items) {
			List.add(results, method(item))
		}
		return results
	}

//TODO: this is super awkward.  Replace in Cards as well
	@expression("every item (of|in) <List> (where|with) <method>", {
		types: [ List, Function ],
		returns: Boolean
	})
	static every(list, method) {
		if (!(list instanceof List)) return false
		if (!(method instanceof Function)) return false
		for (let item in list.items) {
			if (!Type.is_truthy(method(item)) return false
		}
		return true
	}

	@expression("<List> has items (where|with) <method>", {
		inverse: "<List> does not have items (where|with) <method>",
		types: [ List, Function ],
		returns: Boolean
	})
	static has_items_where(list, method) {
		for (let item in list.items) {
			if (Type.is_truthy(method(item)) return true
		}
		return false
	}


	//
	// Modify the list in place
	//
	@action("empty <List>", { types: [ List ] })
	static empty(list) {
		if (!(list instanceof List)) return false
		list.items = []
		return true
	}

	@action("set items of <List> to <items as List>", { types: [ List, List ]}) {}
	static set_items(list, items) {
		if (!(list instanceof List)) return false
		if (!(items instanceof List)) return false
		List.empty(list)
		List.add_items(list, items)
		return true
	}

	@action("add <item> to <List>", { types: [ undefined, List ] })
	static add(list, item) {
		if (!(list instanceof List)) return false
		if (!List.can_add_item(list, item)) return false
		List.items.push(item)
		return true
	}

	@action("add <items as List> to <List>", { types: [ List, List ] })
	static add_items(list, items) {
		if (!(list instanceof List)) return false
		if (!(items instanceof List)) return false
		List.for_each(items, (item) => List.add(list, item))
		return true
	}

	@action("add <item> to <List> at <position>", { types: [ undefined, List, Integer ] })
	static add_at_position(list, position, item) {
		if (!(list instanceof List)) return false
		if (!(position instanceof Integer)) return false
		if (!List.can_add_item(list, item)) return false
		List.items.splice(position - 1, 0, item)
		return true
	}

	@action("prepend <item> to <List>", { types: [undefined, List ] })
	static prepend(list, item) {
		if (!(list instanceof List)) return false
		List.add_at_position(list, 1, item)
		return true
	}

	@action("append <item> to <List>", { types: [undefined, List ] })
	static append(list, item) {
		if (!(list instanceof List)) return false
		List.add(list, item)
		return true
	}

	@action("add <items as List> to <List> at <position>", { types: [ List, List, Integer ] })
	static add_items_at_position(list, position, items) {
		if (!(list instanceof List)) return false
		if (!(items instanceof List)) return false
		if (!(position instanceof Integer)) return false
		List.for_each(items, (item) => {
			if (List.can_add_item(list, item)) {
				List.add_at_position(list, position, item)
				position++
			}
		})
		return true
	}

	@action("remove <item> from <List>", { types: [ undefined, List ] })
	static remove(list, item) {
		if (!(list instanceof List)) return false
		while (let position = List.position_of(list, item)) {
			List.remove_at_position(list, position)
		}
		return true
	}

	@action("remove <items as List> from <List>", { types: [ List, List ] })
	static remove_items(list, items) {
		if (!(list instanceof List)) return false
		if (!(items instanceof List)) return false
		List.for_each(list, (item) => List.remove(list, item) )
		return true
	}

	@action("remove item <position> (from|of) <List>", { types: [ Integer, List ] })
	static remove_at_position(list, position) {
		if (!(list instanceof List)) return false
		if (!(position instanceof Integer)) return false
		list.items.splice(position - 1, 1)
		return true
	}

	@action("move <item> to end of <List>", { types: [ undefined, List ] })
	static move_to_end(list, item) {
		if (!(list instanceof List)) return false
		List.remove(list, item)
		List.append(list, item)
		return true
	}

	@action("reverse <List>", { types: [ List ] })
	static reverse(list) {
		if (!(list instanceof List)) return false
		list.items.reverse()
		return true
	}


	@action("randomize <List>", { types: [ List ] })
	static randomize(list) {
		if (!(list instanceof List)) return false
		let copy = [].concat(list.items)
		let results = []
		while (copy.length) {
			let random_index = Math.floor(Math.random() * copy.length)
			results.push(copy[random_index])
			copy.splice(random_index, 1)
		}
		list.items = results
	}

	//### Restrict list on `add`
//>	unique = false
	@prototype({ type: Boolean })
	static unique = false

//>	nonempty = false
	@prototype({ type: Boolean })
	static nonempty = false

//>	types as Array
	@prototype({ type: Array })
	static types = undefined

//>	expression can add <item> to List
	@expression("can add <item> to <List>", {
		inverse: "can not add <item> to <List>",
		types: [ undefined, List ],
		returns: Boolean
	})
	// note argument swizzling here!
	static can_add_item(list, item) {
		if (!(list instanceof List)) return false
//>		return no if unique of list is true and item is in list
		if (list.unique && List.is_in(list, item)) return false
//>		return no if nonempty of list is true and item is not defined
		if (list.nonempty && Type.is_not_defined(item)) return false
//>		return no if types of list is not empty and item is not one of types of list
		if (list.types && !Type.is_one_of(item, list.types)) return false
//>		return yes
		return true
	}


}
