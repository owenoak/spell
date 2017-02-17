## A `Price` is a numeric cost.
- TODO: currently doing dollars only, generalize to all currency symbols
```
define Price as a Number
	property dollars-symbol with default "$"
	property cents-symbol with default "¢"

	get dollars
		return my integer

	get cents
		return my fraction



```

### If creating with a string, parse into price type
```
	on creation with a string
		set my value to string as price

```
### Generic price => text conversion
```
to convert price to text
	// TODO: currency symbol,

to convert price to fancy-text
```


### Generic text => price conversion
```
to convert text to price
	// TODO: regex format of price
```

