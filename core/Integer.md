## Integer as subclass of Number


```
define type integer as a number
	// override precision
	property precision = 0

	to pad with numeric length and character with default "0"
		string = "{my value}"
		while length of string is less than length
			prepend character to string
		return string
```

```
to pad a number with numeric length and character with default "0"
	text = "{my value}"
	while length of text is less than length
		prepend character to text
	return text
```


```
to convert integer to fancy text
	get "{integer}"
	reverse it
	group into chunks of 3
	join it with ","
	return reverse it
```




## Ordinals

- 1, 2, 3...
- first, second, ...tenth
- last, penultimate, second-to-last, third-to-last
- all

## ItemOrdinal
- <ordinal> <itemVar>



## Range
