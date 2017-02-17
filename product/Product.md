## A `Product` is a thing which can be purchased.
```
define type Product as a Thing
```

### Indexable mixin:  two-part primary key:  `brand-id` + `product-id`
```
	make Products Indexable

	property brand-id as text
	property product-id as text

	property key as text
	get key as "{my brand-id}::{my product-id}"
	set key as
		split key by "::"
		set my brand-id to first item of it
		set my product-id to second item of it

	to be valid a product
		must have a product-id
		must have a brand-id
```

### Product registry -- only one instance of a Product (by key) will be available
```
define Product
	make Products Registered

```


### brand / company affiliation
```
	get brand as Brand my brand-id
	get company as find Company whose brands contains my brand
---

### Title / description / tags
```
	property title as text with default "Untitled Product"
	property description as html
	property tags as a unique list of tags
	property categories as a unique list of texts
```

### Product photos
```
	property photos as a list of references to Images
	get photo as the first item in my photos

	to be valid a product
		should have a photo
```

### Price Information
```
	property retail-price as price
	get price as my retail-price
```


