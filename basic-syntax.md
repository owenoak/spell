# conditional structures

if {condition} (: | then INDENT) {statements}
else if {condition}(: | then INDENT) {statements}

(else | otherwise) {statements}
(else | otherwise) {statements}

{statement} if {condition}
{statement} if {condition} (else | otherwise) {statement}




# property expressions
---------------------------
{propertyExpression} ->
	{identifier}
		eg	`suit`
		eg	`top card`
		eg	`the deck`

	(the) {property} of {propertyExpression}
		eg	`direction of card`
		eg	`the direction of the card`
		eg	`the direction of my card`

	(the) {ordinal} (item) of {propertyExpression}
		eg	`the first card in the deck`



# scoping
--------------
global {identifier}
	eg	`global app`			# pulls app into scope

the {identifier}
	eg	`the app`

my {identifier}
	eg	`my suit`			# `this.suit`, undefined if `this` doesn't exist



# Assignment
------------------
get {propertyExpression}	# value inserted into `it`
	eg	`get the time`

set {propertyExpression} to {expression}
	eg	`set suit to "hearts"`
	eg	`set the location of the pile to the mouse location`

{propertyExpression} = {expression}
	eg	`last location = the mouse location`




# Type checking
----------------
<Type>
	eg	`parse Text`

<identifier> as <Type>
	eg	`suit as text`
	eg	`pile as Cards`




# {is expression}
---------------------
{thing} is (!not) {expression}
{thing} is (!not) defined
{thing} is (!not) undefined
{thing} is (!not) empty
{thing} is (!not) (a | an) {Type}
{thing} is (!not) in {collection}
{thing} is (!not) one of {collection}

{expression} is (!not) less than {expression}
{expression} is (!not) less or equal to {expression}
{expression} is (!not) greater than {expression}
{expression} is (!not) greater or equal to {expression}

there is (!not) (a | an) {thing}

{thing} has (a | an) (property) {identifier}
{thing} (does not have | doesn't have) (a | an) (property) {identifier}


# {are expressions}
---------------------
{things} are (!not) {expression}
{things} are (!not) defined
{things} are (!not) undefined
{things} are (!not) empty
{things} are (!not) {Type}s
{things} are (!not) in {collection}

{things} are less than {expression}
{things} are less or equal to {expression}
{things} are greater than {expression}
{things} are greater or equal to {expression}



# {collection expressions}
--------------------------

## all must be true:
---------------------
every {plural expression} {is expression}
	eg	`every card in the pile is a spade`

{things} {are expression}
	eg	`cards in the pile are spades`

all {things} {are expression}
	eg	`all cards in pile are spades`



## any is true
---------------
any {things} {are expression}
	eg	`any players are online`

any {things} (in | of) {collection} {are expression}
	eg	`any cards in the pile are spades`
	eg	`any of the top 4 players are online`

some {things} are {expression}
	eg	`some cards in the pile are spades`





# {ordinal}
## note that ordinals are 1-based!!!
-------------------------------------
{integer}
	eg	`1`, `2, ...
	eg	`one`, `two`, `three`...

{ordinal}
	eg	`first`, `second`, ... `penultimate`, `last`

{ordinal} to last
	eg	`first to last`, `second to last`, ...




# {collection size}
## note: collection size is also 1-based
--------------------
size of {collection}
length of {collection}
number of {items} of {collection}


# {singular item expression }
------------------------------
{item} {number expression} of {collection}
	eg	`item 1 of the list`
	eg	`card 2 of the pile`

{first|second|...penultimate|last} {item} (of|in) {collection}
	eg	`last card of the pile`
	eg	`second friend in my friends`

random {item} (of|in) {collection}




# {range expression}
--------------------
{things} {ordinal} to {ordinal} of {collection}
	eg	`items 1 to 3 of the list`

(the) (first | last) {integer} {things} of {collection}
	eg	`the first three cards of the pile`
	eg	`last five cards of the pile`

(the) (top | bottom) (number) {collection}
	eg	`the top 5 players`

(the) (top | bottom) (number) {things} (of | in) {collection}
	eg	`the bottom 5 cards in the pile`

{things} of {collection} starting with {identifier}
	eg	`cards of the pile starting with the card`



# {filter expression}
-----------------------
{things} (in|of) {collection} (with|which|where) {expression}
*TODO*
	eg	`items of pile with rank greater than spade`
	eg	`items of pile which are spades`
	eg	`items of pile where color is black`

{range expression} (where|which) {are expression}
	eg	`first two items of pile which are spades`




# {grouping expresion}
-------------------------
group {collection} into chunks of {number}
group {collection} by {property}
	eg	`group pile by suit`

group {collection} by {items expression}
	eg	`group pile by items with color = black`


# {set logic expresions}
-------------------------
union of {things} in {collection} and {collection}
common {things} (in | of) {collection} and {collection}
{things} (in | of) {collection} which are (also) in {collection}
{things} (in | of) {collection} which are not in {collection}

differences (in | between) {things} (in | of) {collection} and {collection}

