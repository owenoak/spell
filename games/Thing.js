//>define type Thing
export class Thing {
	// Class reflection semantics
	Type = Thing
	static Types = [Thing]
	static name = "things"
	static names = "things"
	static Name = "Things"
	static Names = "Things"

	constructor(properties) {
		Object.assign(this, properties)
	}

}
