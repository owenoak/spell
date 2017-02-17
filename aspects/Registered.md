# `Registered` mixin class
- "weak indexed set of <Type>"
	- unordered set of items of specified type
	- indexed by `keyName` sp

```
define mixin Registered for <Type> with <keyName as "key"> and <keyType as text>
	// Create the Registry singleton.
	Type.Registry = Weak Indexed Set of <Type> with keyName

	// Add to registry when creating.
	after creation
		add me to Type.Registry

	// Remove from registry when deleting.
	after deletion
		remove me from Type.Registry

	// Update registry when key changes.
	before changing <keyName>
		remove me from Type.Registry
	after changing <keyName>
		add me to Type.Registry


	// Syntactic sugar so "Product Registry" points to the registry
	understand "{Type.Name} Registry" to mean Type.Registry

	// Syntactic sugar so `Product "key"` returns item from registry.
	understand "{Type.Name} <key as keyType>" to mean
		Type.Registry.find(key)

	// Syntactic sugar to return iterable for items in registry which match expression.
	// Note that this may be expensive!!!
	understand "find {Type.Names} (where|whose|with) <expression>" to mean
		Type.Registry.iteratorWhere(expression)


```
