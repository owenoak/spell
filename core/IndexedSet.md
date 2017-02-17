## "Indexed Set" type


```
define type Set of <Type> as Set
	constant item type with Type
	constant keyName with default "key"

	constant index =

```




```
define mixin Typed Collection for <Collection> with <Type>

	before add item
		if item is not a <Type>
			warn {
				message: "Attempting to add {item.type.name} to collection of {item.type.name.plural}"
				collection: this
				item: item
			}
			exit	// abort the ad




```
