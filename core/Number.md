# Number and related datatypes
- Numbers are immutable (???)


## `Number` class

```
define Number as system type Number
	default 0

	to be valid:
		:JS: typeof this === "number" && !isNaN(this)
```

### alias "numeric" to mean "as a number"
```
alias "numeric <variable>" to mean "<variable> as a Number"
```

### String to number
- Radix = base number system (rename???)
```
define Number
	property radix is a number with default 10
```

### Creation with text value
```
define Number
	property value as text

	on creation with type text
		get text as number with my radix
		if it is defined set my value to it
		otherwise warn "{text} is not a valid number"
```

### Text => Number conversion
```
define Text
	to convert to number
		convert my value to a number with radix 10

to convert text to number with numeric radix
	:JS:(text, radix) => {
		// NOTE: returns `undefined` if NaN!
		let number = parseFloat(text, radix);
		if (!isNaN(number)) return number;
	}
```


### Precision for text output
```
define Number
	property precision is a number

	// integer part of number
	get integer as an integer
		return my value as an integer

	// fractional part of number
	get fraction as an integer
		:JS:memoize((number) => {
			// TODO: doesn't do scientific notation
			if (isNaN(number)) return 0;
			let string = ""+number;
			if (!string.includes(".")) return 0;
			return parseInt(string.split(".")[1], 10);
		})

	to format as text
		if precision is defined
			return format my value as text with precision
		return "{number}"

	to format as text with numeric precision
		pad my fraction with length precision





```

### Number => Text conversion
```
to convert number to text
	return "{number}"

to convert number to text with numeric precision
	set fraction to pad fraction of number with length precision
	return "{number as integer}.{fraction}"

to convert number to fancy text
	get "{number as integer}"
	reverse it
	group it into chunks of 3
	join it with ","
	reverse it
```




