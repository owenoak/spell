{conditional}
---------------------------
	if {condition} (: | then | INDENT) {statements}
	else if {condition}(: | then | INDENT) {statements}
	(else | otherwise)(: | INDENT)? {statements}

	{statement} if {condition}
	{statement} if {condition} (else | otherwise) {statement}


{property expression}
---------------------------
	(the) {identifier}
		eg	`suit`
		eg	`the deck`
		eg	`first name`

	(the) {property} of {property expression}
		eg	`direction of card`
		eg	`the direction of the card`
		eg	`the direction of my card`

	(the) {possessive object} {property}
		eg	`the card's suit`

	(the) {ordinal} {item} of {property expression}
		eg	`the first card in the deck`

{properties expression}
-------------
	{property expression} and {property expression}
	{property expression}


{identifier}
--------------
	global {identifier}
		eg	`global app`		# pulls app into scope

	the {identifier}
		eg	`the app`			# in a class, refers to property of the class
								# outside of a class, "magically" finds identifier in dynamic scope

	my {identifier}
		eg	`my suit`			# === `this.suit`, undefined if `this` doesn't exist



Assignment
------------------
	get {property expression}	# value inserted into `it`
		eg	`get the time`

	set {property expression} to {expression}
		eg	`set suit to "hearts"`
		eg	`set the location of the pile to the mouse location`

	{property expression} = {expression}
		eg	`last location = the mouse location`



Defining types
---------------
	- ??? Would be convienient if we always took property bag, but that's bad for e.g. List

	define type {typeName} (as {typeName}) {INDENT} {statements}


Creating instances
-------------------
	(create | new) {type} (with {properties})
	duplicate {instance} (with {properties})


Type checking
----------------
	{Type}
		eg	`Text`

	{identifier} as {Type}
		eg	`suit as text`
		eg	`pile as Cards`




{is expression}
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


{are expression}
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



{collection expression}
--------------------------

### all must be true:
	(every | each) {item} (in | of) {collection} {is expression}
		eg	`every card in the pile is a spade`

	all {items} (in {are expression}
		eg	`all cards in pile are spades`

	{items} {are expression}
		eg	`cards in the pile are spades`


### any is true
	(any | some | at least one) {collection} {are expression}
		eg	`any players are online`

	(any | some | at least one) {thing} (in | of) {collection} {is expression}
		eg	`any card in the pile is a spades`

	(any | some | at least one) {things} (in | of) {collection} {are expression}
		eg	`any cards in the pile are spades`

	(any | some | at least one) of {range expression} {are expression}
		eg	`any of the top 4 players are online`


### containment
	{collection} (contains | includes) {item} (starting at {ordinal})
	{collection} (contains | includes) {item} or {item}... (starting at {ordinal})
	{collection} (contains | includes) {item} and {item}... (starting at {ordinal})



{ordinal}
-------------------------------------
	- note that ordinals are 1-based!!!

	{integer}
		eg	`1`, `2, ...
		eg	`one`, `two`, `three`...

	{ordinal}
		eg	`first`, `second`, ... `penultimate`, `last`

	{ordinal} to last
		eg	`first to last`, `second to last`, ...

	last {item identifier}
		eg	`last card of the pile`



{collection size}
--------------------
	- note collection size is also 1-based

	size of {collection}
	length of {collection}
	number of {items} of {collection}


{singular item expression}
------------------------------
	{item} {number expression} of {collection}
		eg	`item 1 of the list`
		eg	`card 2 of the pile`

	{ordinal} {item} (of | in) {collection}
		eg	`last card of the pile`
		eg	`second friend in my friends`

	(a) random {item} (of | in) {collection}
		eg	`random card in the pile`




{range expression}
--------------------
	all {things} (of | in) {collection}
		eg	`all items in the pile`

	{things} {number} (to | through) {number} (of | in) {collection}
		eg	`players 1 to 4 of the high scorers`
		eg	`cards one through four of the pile`

	(the) {ordinal} (to | through) {ordinal} {things} (of | in) {collection}
		eg	`the first to fourth cards of the pile"

	(the) (first | last) {integer} {things} (of | in) {collection}
		eg	`the first three cards of the pile`
		eg	`last five cards of the pile`

	(the) (top | bottom) (number) {things} (of | in) {collection}
		eg	`the bottom 5 cards in the pile`

	(the) (top | bottom) (number) {collection}
		eg	`the top 5 players`

	{things} of {collection} starting with {identifier}
		eg	`cards of the deck starting with the ace of spades`

	every {ordinal} {thing} (of | in) {collection}
		eg	`every third item in the pile`

	{number} random {things} (in | from) {collection}
		eg	`five random cards in the pile`
		- implicitly does not re-choose same item




{filter expression}
-----------------------
	{things} (in | of) {collection} (with | which | where) {expression}
	*TODO*
		eg	`items of list with last name = "williams"`
		eg	`cards of pile which are spades`
		eg	`cards in pile where color is black`

	{range expression} (where | which) {are expression}
		eg	`first two items of pile which are spades`




{grouping expresion}
-------------------------
	divide {collection} into groups of {number}
		eg	`divide pile into groups of 3`

	group {collection} by {property}
		eg	`group pile by suit`

	group {collection} by {items} (with | where) {item expression}
		eg	`group deck by cards with color = black`

	group {collection} by {items} (with | where) {item expression} and {item expression}
		eg	`group deck by cards with color = black` and card is a face card`


{set expresion}
-----------------
- all methods return type of first collection

	(the) union (of | in | between) {collection} and {collection}
	{collection} + {collection}
	{collection} and {collection}
	(all) {things} in {collection} and {collection}

	(the) differences (of | in | between) {collection} and {collection}
	{collection} - {collection}
	{things} in {collection} (but | and) not in {collection}

	(the) intersection (of | in | between) {collection} and {collection}
	(the) common {things} (in | of) {collection} and {collection}
	{things} (in | of) {collection} which are (!not) (also) in {collection}



{position expression}
-----------
- Position is 1-based index in a list/collection
	{number}
	{item} {number}
	{ordinal} {item}

{position}
-----------
	find position of {item} in {collection}  (starting from {ordinal})
	find last position of {item} in {collection}
	find all positions of {item} in {collection}



{collection manipulation}
--------------------------

### addition
	add {thing | things} to {collection}
	add {thing | things} to {collection} (at | after | before) {position expression}
	add {thing | things} to {collection} (after | before) {item}

	append {thing | things} to {collection}
	prepend {thing | things} to {collection}

	move {item expression} to (start | end | middle) of {list}

### removal
	remove {items} from {collection}
		eg	`remove cards from pile`

	remove {quantity} {items} from {collection}
		eg	`remove first five cards from pile`

	remove {items} from {collection} where {condition}
		eg	`remove cards from pile where the card is a spade`

	remove {quantity} {items} from {collection} where {condition}
		eg	`remove last 5 cards from pile where the card is a spade`

	remove (empty | undefined) items from {collection}
	remove duplicates from {collection}


### {sort modifier}
	ascending
	descending
	in reverse order
	case sensitive
	case insensitive
	numerically
	non-numerically

### reordering
	sort {collection} {sort modifier}
	sort {collection} by {property list} {sort modifier} (with default {value})
		eg	`sort people by last name`
		eg	`sort people by list name and first name descending`

	sort {collection} by {expression}
		eg	`sort cards by the rank of the card`

	reverse {collection}
	(randomize | shuffle) {collection}






{repeat identifier}
---------------------
- use in repeat expression to specify variables for use statements
- if {item} is not specified, statements will use `it`
- if {index} is not specified, statements will use `key`

	{empty}
	{item identifier}
	{item identifier} (, | and) {key identifier}



{repeat expression}
---------------------
- results of statements for each item collected in `the results`

	for each {repeat identifier} in {collection} (: | INDENT) {statements}
		eg	`for each in pile: turn it over`
		eg	`for card card in pile: turn card over`
		eg	`for each card, number in pile: turn card over if number > 10`

	for every (other | {ordinal}) {repeat identifier} in {collection} (: | INDENT) {statements}

	repeat {integer expression} times (: | INDENT) {statements}
	repeat with {variable} = {integer} to {integer} (: | INDENT) {statements}

	while {condition} (: | INDENT) {statements}
	until {condition} (: | INDENT) {statements}

	get {property} for each ({item idenfitifer}) in {collection}
		eg	`get suit for each card in pile`
		- collects properties as array of values in `the results`
		- TODO: into `it`?

	get {properties} for each ({item idenfitifer}) in {collection}
		eg	`get suit and rank for each card in pile`
		- collects properties as an array of objects {suit, rank} in `the results`


