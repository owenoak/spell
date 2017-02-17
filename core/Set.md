## "Set" type
- TODO: return set or items added/removed?
```
define type Set as Collection
	property set = system type Set

	get size
	get length
	get number of items
		:JS: this.set.size

	get items
		:JS: this.set.values()

	get keys
		return my items
```

### Adding / Removing
```
	to add item
		:JS: this.set.add(item)

	to remove item
		:JS: this.set.delete(item)

	to delete all items as collection
	to remove all items as collection
		:JS: items.forEach(item => this.set.delete(item));

	to has item
		:JS: this.set.has(item)

	to clear
		:JS: this.set.clear()

```


### Tests
```
> put new Set into mySet
> add 1 to mySet
< 1

> add 2 to mySet
< 2

> length of mySet
< 2

> add 2 from mySet
< 2

> length of mySet
< 2

> remove 2 from mySet
> length of mySet
< 1

> mySet has 1
< true

> mySet has 2
< false

> clear mySet
> length of mySet
< 0

> add (1,2,2,3) to mySet
> length of mySet
< 3
```
