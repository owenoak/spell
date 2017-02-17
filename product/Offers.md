## An `Offer` is a special deal on one or more products.
```
define type Offer as a Thing
```

### Indexable mixin -- single primary `key`
```
	make Offers Indexable
	property key as text

	to be valid:
		offers must have a key
```

### list of Products this offer stands for
```
	property products is an indexed list of references to Products
	get product as the first item in my products

	to be valid
		offers must have a product
```

### offer description / disclaimer /etc
```
	property source as text
	property title as text which defaults to the title of my product
	property description as text which defaults to the description of my product
	property disclaimer as text
	property tags as unique list of tags which defaults to
		the set of tags of my products
	property categories as unique listof texts which defaults to
		the set of categories of my products
```

### offer price info
```
	property retail-price as price which defaults to the retail-price of my product
	property sale-price as price
	property discount as a discount

	property quantity as number with default 1
	property reward-quantity as a number
	property reward-discount as a discount
	property reward-products as a list of references to products

	get fancy-price as text
		if my reward-quantity is not 0
			return "Buy {my quantity} get {my reward-quantity} free"

		if my reward-discount is not empty
			return "Buy {my quantity} get 1 {my reward-discount} off"

		if my sale-price is not 0
			return "{my sale-price}"

		if my discount is not empty
			return "{my discount}"

		if my retail-price is not empty
			return "{my retail-price}"


	property savings as text which defaults to:
		if my retail price is not 0 and my sale price is not 0
			savings = my retail-price - my sale-price
			return "Save {savings}"

		if my discount is not empty
			return "Save {my discount}"
```
