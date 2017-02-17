# property expressions
---------------------------
{propertyExpression} ->
	{identifier}
		eg `suit`
		eg `top card`
		eg `the deck`

	(the) {property} of {propertyExpression}
		eg `direction of card`
		eg `the direction of the card`
		eg `the direction of my card`

	(the) {ordinal} (item) of {propertyExpression}
		eg `the first card in the deck`


# scoping
--------------
global {identifier}
	eg `global app`			# pulls app into scope

the {identifier}
	eg `the app`

my {identifier}
	eg `my suit`			# `this.suit`, undefined if `this` doesn't exist



# Assignment
------------------
get {propertyExpression}	# value inserted into `it`
	eg `get the time`

set {propertyExpression} to {expression}
	eg `set suit to "hearts"`
	eg `set the location of the pile to the mouse location`

{propertyExpression} = {expression}
	eg `last location = the mouse location`




# Type checking
----------------
<identifier> as <Type>
	eg `suit as text`
	eg `pile as Cards`
