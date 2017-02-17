## A `Discount` is a currency or percentage or random string
```
define Discount as a Currency or a Percentage or Text
```

### If creating with a string, parse into discount type
```
	on creation with a string
		set my value to string as discount
```

### Generic discount => text conversion
```
to convert discount to text
	if the type of discount is (currency or percentage) then return "{discount} off"
	return discount
```

### Generic text => discount conversion
```
to convert text to discount
	if text is empty string return undefined

	get text as currency
	if it is valid return it

	get text as percentage
	if it is valid return it

	return text
```
