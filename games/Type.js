class Type {
	@expression("<thing> is defined", {
		inverse: ["<thing> is not defined", "<thing> is undefined"],
		types: [ undefined ],
		returns: Boolean
	})
	static is_defined(value) {
//TODO: empty string?
		return value != null && !isNaN(value)
	}

	@expression("<thing> is truthy", {
		inverse: ["<thing> is not truthy", "<thing> is falsy"],
		types: [ undefined ],
		returns: Boolean
	})
	static is_truthy(value) {
		return value != null && !isNaN(value)
	}


	@expression("<thing> is (a|an) <Type>", {
		inverse: "<thing> is not (a|an) <Type>",
		types: [ undefined, Type ],
		returns: Boolean
	})
	static is_a(thing, type) {
//TODO:  String vs string?
		return thing instanceof type
	}


	@expression("<thing> is one of <Types>", {
		inverse: "<thing> is not one of <Types>",
		types: [ undefined, Types ],
		returns: Boolean
	})
	static is_one_of(thing, types) {
		for (let type in types)
			if (Type.is_a(thing, type)) return true
		return false
	}


	@expression("<things as List> are <Type>", {
		inverse: "<things as List> are not <Types>",
		types: [ List, Type ],
		returns: Boolean
	})
	static are(thing, type) {
//TODO:  String vs string?
		return thing instanceof type
	}

}
