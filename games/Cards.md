# "Standard" US/French playing card setup.
- You can set `ace high` and `include jokers` when creating deck.
- If you want to subset the cards, redefine `Deck.ranks` in subset or new instance.


## Card type
```
define type Card
	### Card identification
	deck as Deck
	suit as text
	rank as text

	### Card orientation as "up" or "down"
	direction as one of ("up", "down") with default "down"
	expression Card is face up: direction of card is "up"
	expression Card is face down: direction of card is "down"

	# global actions to switch card orientation
	to turn Card face up
		set direction of card to "up"

	to turn Card face down
		set direction of card to "down"

	to turn Card over
		if direction of card is "up" then turn card face down
		else turn card face up

```


## Pile
```
define type Pile as Cards
	name as text
	appearance as one of ("stacked", "staggered", "fanned") with default "stacked"

	### Pile expressions
	expression bottom card of Pile: the first item of pile
	expression top card of Pile: the last item of pile

	### Pile actions
	to shuffle Pile
		turn pile face down
		randomize pile

	to flip Pile
		turn pile face down
		reverse pile

```


## Deck
- US standard card deck with optional jokers.
```
define type Deck as Pile
	### Ranks and suits
	ace high = no
	ranks = ("ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king")
	suits = ("clubs", "diamonds", "hearts", "spades")

	### Joker setup
	include jokers = no
	joker ranks = ("joker")
	joker suits = ("red", "black")


	### When creating deck, create all cards
	after creation
		make cards

	to make cards
		if ace high then move "ace" to end of ranks
		for each suit in suits
			for each rank in ranks
				make card for deck with suit and rank

		if include jokers
			add joker ranks to ranks
			add joker suits to suits

			for each suit in joker suits
				for each rank in joker ranks
					make card for deck with suit and rank

	to make card for Deck with suit and rank
		card = new Card with properties (deck, suit, rank)
		add card to deck


	### Syntactic sugar for identifying cards
	- eg:  `card is a club` or `top card of pile is not a face card`
	expression Card is a club: suit of card is "clubs"
	expression Card is a diamond: suit of card is "diamonds"
	expression Card is a heart: suit of card is "hearts"
	expression Card is a spade: suit of card is "spades"

	expression Card is an ace: rank of card is "ace"
	expression Card is a jack: rank of card is "jack"
	expression Card is a queen: rank of card is "queen"
	expression Card is a king: rank of card is "king"
	expression Card is a joker: rank of card is "joker"

	expression Card is a face card: rank of card is in ("jack", "queen", "king")
	expression Card is a number card: card is not a face card

	expression color of Card
		return "black" if suit of card is in ("clubs", "spades", "black")
		return "red"

	expression value of Card
		ranks = ranks of deck of card
		return position of rank of card in ranks

	expression name of Card
		suit = capitalize suit of card
		rank = capitalize rank of card
		if rank is "Joker" return "{suit} {rank}"
		return "{rank} of {suit}"
```

