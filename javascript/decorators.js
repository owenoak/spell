export English = {
	register_expression(properties) {}
	register_action(properties) {}
	register_property(properties) {}
}


export function expression(syntax, properties = {}) {
	return function decorator(thing, property, descriptor) {
		Object.assign(properties, { syntax, thing, property, descriptor })
		English.register_expression(properties)
		return descriptor
	}
}


export function action(syntax, properties = {}) {
	return function decorator(thing, property, descriptor) {
		Object.assign(properties, { syntax, thing, property, descriptor })
		English.register_action(properties, thing, property)
		return descriptor
	}
}


export function property(properties = {}) {
	return function decorator(thing, property, descriptor) {
		Object.assign(properties, { thing, property, descriptor })
//TODO
		English.register_property(properties, thing, property)
		return descriptor
	}
}


export function prototype(properties = {}) {
	return function decorator(thing, property, descriptor) {
		Object.assign(properties, { thing, property, descriptor })
//TODO
		English.register_property(properties, thing, property)
		return descriptor
	}
}
