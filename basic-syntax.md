# conditional structures

if {condition} (:|then INDENT) {statements}
else if {condition}(:|then INDENT) {statements}
(else|otherwise) {statements}

{statement} if {condition}
{statement} if {condition} (else|otherwise) {statement}




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




# is/are expressions
---------------------
{thing} is (!not) {expression}
{things} are (!not) {expression}

{thing} is (!not) (defined|undefined)
{things} are (!not) (defined|undefined)

{thing} is (!not) empty
{things} are (!not) empty

{thing} is (!not) (a|an) {Type}
{things} are (!not) {Type}s

{thing} is (!not) in {collection}
{things} are (!not) in {collection}

{expression} < {expression}
{expression} is less than {expression}
{expression} is less or equal to {expression}

{expression} > {expression}
{expression} is greater than {expression}
{expression} is greater or equal to {expression}



# collection expressions
--------------------------
{things} are {expression}
	eg	`cards in the pile are spades`

all {things} are {expression}
	eg	`all cards in pile are spades`

every {plural expression} is {expression}
	eg	`every card in the pile is a spade`


any {things} are {expression}
	eg	`any cards in the pile are spades`

some {things} are {expression}
	eg	`some cards in the pile are spades`








