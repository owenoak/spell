## <Fancy-Price/> component for displaying USD `Price` types as stylable HTML.
- Draws with <fancy-price> HTML element.
- TODO: generalize for other currencies!
	- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
- NOTE: constant values can be overriden per install to customize the display.
```
define component Fancy-Price
	property price as a price

	// How should we show a zero price?
	// You can override at system level by setting `Fancy-Price.SHOW-ZERO-AS`
	constant SHOW-ZERO-AS = "free"
	property show-zero-as is one of "none" or "free" or "price" with default SHOW-ZERO-AS

	// Empty price output
	constant EMPTY-PRICE = <fancy-price class="empty"/>

	// Free price output
	constant FREE-PRICE =
		<fancy-price class="free">
			<span class="free">Free</span>
		</fancy-price>

	// Dollars and cents symbols
	constant DOLLAR-SYMBOL = <span class="dollar-symbol">$</span>
	constant CENT-SYMBOL = <span class="cent-symbol">¢</span>
	constant PERIOD-SYMBOL = <span class="period-symbol">.</span>

	to draw-dollars with dollars as integer
		<span class="dollars">{dollars as fancy number}</span>

	to draw-cents with cents as text
		<span class="cents">{cents}</span>

	to draw
		// if no price, return empty-price constant.
		if my price is empty
			return EMPTY-PRICE

		if my price is 0
			if my show-zero-as is "none"
				return EMPTY-PRICE

			if my show-zero-as is "free"
				return FREE-PRICE

		dollars = integer of my price
		cents = fraction of my price

		// Cents only:  5¢ or 99¢
		if dollars < 1
			cents-text = pad cents with length 2 if cents > 9 else cents as text
			return <fancy-price class="has-cents no-dollars">
				{draw-cents with cents-text}
				{CENT-SYMBOL}
			</fancy-price>

		// Even dollar amount:  $2 or $2,000
		if cents is 0
			return <fancy-price class="has-dollars no-cents">
				{DOLLAR-SYMBOL}
				{draw-dollars with dollars}
			</fancy-price>

		// Dollars and cents:  $2.99 or $2,999.01
		cents-text = pad cents with length 2
		return <fancy-price class="has-dollars has-cents">
				{DOLLAR-SYMBOL}
				{draw-dollars with dollars}
				{PERIOD-SYMBOL}
				{draw-cents with cents-text}
			</fancy-price>

```



###
